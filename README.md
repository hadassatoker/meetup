# Full-Stack TypeScript Application

A modern web application built with TypeScript, featuring a React frontend and Express backend.

## Project Structure

```
.
├── frontend/           # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript interfaces
│   └── package.json
├── backend/           # Express TypeScript backend
│   └── package.json
└── README.md
```

## Technology Stack

### Frontend
- React 19.1.0
- TypeScript 4.9.5
- Modern component architecture
- Type-safe API integration

### Backend
- Express.js
- TypeScript
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v10 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Development

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Documentation

### Base URL
```
http://localhost:3001/api
```

### Response Format
All API responses follow this format:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
```

### Error Handling
API errors are returned with appropriate HTTP status codes and error messages in the response body.

## Frontend Architecture

### Component Structure

#### Layout Component
The `Layout` component (`src/components/Layout/Layout.tsx`) provides a consistent structure for all pages with:
- Header
- Main content area
- Footer

```typescript
interface LayoutProps {
  children: React.ReactNode;
}
```

### API Integration

The frontend includes a type-safe API client (`src/services/api.ts`) with methods for all HTTP operations:

```typescript
export const api = {
  get<T>(endpoint: string): Promise<T>;
  post<T>(endpoint: string, data: any): Promise<T>;
  put<T>(endpoint: string, data: any): Promise<T>;
  delete<T>(endpoint: string): Promise<T>;
}
```

### Type Definitions

Common types are shared between frontend and backend in `src/types/api.ts`:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}
```

## Development Workflow

### Code Organization
- Components are organized by feature
- Shared types are in the `types` directory
- API services are centralized in the `services` directory

### Best Practices
1. Use TypeScript for all new code
2. Maintain type safety across the application
3. Follow component-based architecture
4. Handle errors appropriately
5. Use proper type definitions for API responses

## Styling

The application uses CSS modules for styling with a consistent theme:

### Color Palette
- Primary Background: #282c34
- Text Color: #666
- White: #ffffff

### Layout
- Responsive design
- Mobile-first approach
- Consistent spacing and padding

## Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

## Deployment

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm run build
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
