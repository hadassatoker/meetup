import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import itemsRouter from './routes/items';

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/items', itemsRouter);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the TypeScript Express API' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API Documentation:`);
  console.log(`- GET    /api/items     - Get all items`);
  console.log(`- GET    /api/items/:id - Get a single item`);
  console.log(`- POST   /api/items     - Create a new item`);
  console.log(`- PUT    /api/items/:id - Update an item`);
  console.log(`- DELETE /api/items/:id - Delete an item`);
});
