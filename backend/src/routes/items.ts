import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Item, CreateItemDto, UpdateItemDto, ApiResponse } from '../types';

const router = Router();

// In-memory storage for demo purposes
let items: Item[] = [];

// GET /api/items - Get all items
router.get('/', (req: Request, res: Response) => {
  const response: ApiResponse<Item[]> = {
    success: true,
    data: items
  };
  res.json(response);
});

// GET /api/items/:id - Get a single item
router.get('/:id', (req: Request, res: Response) => {
  const item = items.find(i => i.id === req.params.id);
  if (!item) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Item not found'
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Item> = {
    success: true,
    data: item
  };
  res.json(response);
});

// POST /api/items - Create a new item
router.post('/', (req: Request<{}, {}, CreateItemDto>, res: Response) => {
  const { title, description } = req.body;

  if (!title || !description) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Title and description are required'
    };
    return res.status(400).json(response);
  }

  const newItem: Item = {
    id: uuidv4(),
    title,
    description,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  items.push(newItem);

  const response: ApiResponse<Item> = {
    success: true,
    data: newItem
  };
  res.status(201).json(response);
});

// PUT /api/items/:id - Update an item
router.put('/:id', (req: Request<{ id: string }, {}, UpdateItemDto>, res: Response) => {
  const itemIndex = items.findIndex(i => i.id === req.params.id);
  if (itemIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Item not found'
    };
    return res.status(404).json(response);
  }

  const updatedItem: Item = {
    ...items[itemIndex],
    ...req.body,
    updatedAt: new Date()
  };

  items[itemIndex] = updatedItem;

  const response: ApiResponse<Item> = {
    success: true,
    data: updatedItem
  };
  res.json(response);
});

// DELETE /api/items/:id - Delete an item
router.delete('/:id', (req: Request, res: Response) => {
  const itemIndex = items.findIndex(i => i.id === req.params.id);
  if (itemIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Item not found'
    };
    return res.status(404).json(response);
  }

  items.splice(itemIndex, 1);

  const response: ApiResponse<null> = {
    success: true
  };
  res.json(response);
});

export default router;
