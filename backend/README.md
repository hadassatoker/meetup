# Backend API Documentation

## Setup
1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

### Items API

All responses follow the format:
```typescript
{
  success: boolean;
  data?: T;
  error?: string;
}
```

#### GET /api/items
Get all items.

**Response**
- Status: 200 OK
- Body: `ApiResponse<Item[]>`

#### GET /api/items/:id
Get a single item by ID.

**Parameters**
- `id`: string (UUID)

**Response**
- Status: 200 OK
- Body: `ApiResponse<Item>`

**Error Responses**
- Status: 404 Not Found
- Body: `{ success: false, error: "Item not found" }`

#### POST /api/items
Create a new item.

**Request Body**
```typescript
{
  title: string;
  description: string;
}
```

**Response**
- Status: 201 Created
- Body: `ApiResponse<Item>`

**Error Responses**
- Status: 400 Bad Request
- Body: `{ success: false, error: "Title and description are required" }`

#### PUT /api/items/:id
Update an existing item.

**Parameters**
- `id`: string (UUID)

**Request Body**
```typescript
{
  title?: string;
  description?: string;
}
```

**Response**
- Status: 200 OK
- Body: `ApiResponse<Item>`

**Error Responses**
- Status: 404 Not Found
- Body: `{ success: false, error: "Item not found" }`

#### DELETE /api/items/:id
Delete an item.

**Parameters**
- `id`: string (UUID)

**Response**
- Status: 200 OK
- Body: `{ success: true }`

**Error Responses**
- Status: 404 Not Found
- Body: `{ success: false, error: "Item not found" }`

## Type Definitions

### Item
```typescript
interface Item {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### CreateItemDto
```typescript
interface CreateItemDto {
  title: string;
  description: string;
}
```

### UpdateItemDto
```typescript
interface UpdateItemDto {
  title?: string;
  description?: string;
}
```

## Error Handling
- All endpoints return standardized error responses
- 404 errors for non-existent resources
- 400 errors for invalid input
- 500 errors for server errors
