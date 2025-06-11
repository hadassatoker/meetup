// Define common types and interfaces for the application

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateItemDto {
  title: string;
  description: string;
}

export interface UpdateItemDto {
  title?: string;
  description?: string;
}
