import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import itemsRouter from '../../routes/items';
import { Item, CreateItemDto } from '../../types';

const app = express();
app.use(express.json());
app.use('/api/items', itemsRouter);

describe('Items Routes', () => {
  let createdItemId: string;

  const testItem: CreateItemDto = {
    title: 'Test Item',
    description: 'Test Description'
  };

  describe('POST /api/items', () => {
    it('should create a new item', async () => {
      const response = await request(app)
        .post('/api/items')
        .send(testItem)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(testItem.title);
      expect(response.body.data.description).toBe(testItem.description);
      expect(response.body.data.id).toBeDefined();

      createdItemId = response.body.data.id;
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({ description: 'Test Description' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Title and description are required');
    });
  });

  describe('GET /api/items', () => {
    it('should return all items', async () => {
      const response = await request(app)
        .get('/api/items')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/items/:id', () => {
    it('should return a single item', async () => {
      const response = await request(app)
        .get(`/api/items/${createdItemId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(createdItemId);
    });

    it('should return 404 for non-existent item', async () => {
      const response = await request(app)
        .get('/api/items/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Item not found');
    });
  });

  describe('PUT /api/items/:id', () => {
    it('should update an item', async () => {
      const updatedItem = {
        title: 'Updated Title',
        description: 'Updated Description'
      };

      const response = await request(app)
        .put(`/api/items/${createdItemId}`)
        .send(updatedItem)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updatedItem.title);
      expect(response.body.data.description).toBe(updatedItem.description);
    });

    it('should return 404 for non-existent item', async () => {
      const response = await request(app)
        .put('/api/items/non-existent-id')
        .send({ title: 'Updated Title' })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Item not found');
    });
  });

  describe('DELETE /api/items/:id', () => {
    it('should delete an item', async () => {
      const response = await request(app)
        .delete(`/api/items/${createdItemId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should return 404 for non-existent item', async () => {
      const response = await request(app)
        .delete('/api/items/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Item not found');
    });
  });
});
