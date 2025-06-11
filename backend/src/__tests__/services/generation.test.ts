import { describe, expect, it, jest, beforeEach, afterEach } from '@jest/globals';
import axios from 'axios';
import { Response } from 'express';
import { generate } from '../../services/generation';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Generation Service', () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      json: jest.fn() as any
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call OpenAI API and forward response', async () => {
    const testPrompt = 'test prompt';
    const mockApiResponse = { data: { response: 'API response' } };
    mockedAxios.get.mockResolvedValue(mockApiResponse);

    await generate(testPrompt, mockResponse as Response);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://localhost:3002/api/openai?prompt=${encodeURIComponent(testPrompt)}`
    );
    expect(mockResponse.json).toHaveBeenCalledWith(mockApiResponse.data);
  });

  it('should throw error when API call fails', async () => {
    const testPrompt = 'test prompt';
    const mockError = new Error('API error');
    mockedAxios.get.mockRejectedValue(mockError);

    await expect(generate(testPrompt, mockResponse as Response))
      .rejects
      .toThrow('API error');
  });
});
