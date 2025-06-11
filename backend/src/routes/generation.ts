import { Router } from 'express';
import { generate } from '../services/generation';

const router = Router();

router.get('/generate', async (req, res) => {
    const prompt = req.query.prompt as string;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        await generate(prompt, res);
    } catch (error) {
        console.error('Error in generation route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
