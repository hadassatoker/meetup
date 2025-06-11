import { describe, expect, it, jest, afterEach } from '@jest/globals';
import request from 'supertest';
import express, { Response } from 'express';
import generationRouter from '../../routes/generation';
import * as generationService from '../../services/generation';

type GenerateFunction = (prompt: string, res: Response) => Promise<void>;

jest.mock('../../services/generation', () => ({
  generate: jest.fn()
}));

const app = express();
app.use('/api/generation', generationRouter);

describe('Generation Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/generation/generate', () => {
    it('should return 400 if prompt is missing', async () => {
      const response = await request(app)
        .get('/api/generation/generate')
        .expect(400);

      expect(response.body.error).toBe('Prompt is required');
    });

    it('should call generation service with prompt', async () => {
      const testPrompt = 'test prompt';
      const mockGenerate = generationService.generate as jest.MockedFunction<GenerateFunction>;
      mockGenerate.mockImplementation(async (prompt: string, res: Response) => {
        res.json({ response: 'Test response' });
      });

      const response = await request(app)
        .get(`/api/generation/generate?prompt=${encodeURIComponent(testPrompt)}`)
        .expect(200);

      expect(mockGenerate).toHaveBeenCalledWith(testPrompt, expect.any(Object));
      expect(response.body).toEqual({ response: 'Test response' });
    }, 15000);

    it('should handle service errors', async () => {
      const mockGenerate = generationService.generate as jest.MockedFunction<GenerateFunction>;
      mockGenerate.mockImplementation(async () => {
        throw new Error('Service error');
      });

      const response = await request(app)
        .get('/api/generation/generate?prompt=test')
        .expect(500);

      expect(response.body.error).toBe('Internal server error');
    });
  });
});
