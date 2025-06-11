import { Express } from 'express';
import { Server } from 'http';
import { jest } from '@jest/globals';

declare global {
  namespace NodeJS {
    interface Global {
      app: Express;
      server: Server;
    }
  }
}

// Increase timeout for all tests
jest.setTimeout(10000);
