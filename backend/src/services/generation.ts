import axios from 'axios';
import { Response } from 'express';

export async function generate(prompt: string, res: Response): Promise<void> {
    try {
        const response = await axios.get(`http://localhost:3002/api/openai?prompt=${encodeURIComponent(prompt)}`);

        // Forward the response from the OpenAI API
        res.json(response.data);
    } catch (error) {
        console.error('Error in generation service:', error);
        throw error; // Let the route handler handle the error
    }
}
