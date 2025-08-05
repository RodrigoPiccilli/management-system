import { Response } from 'express';

export const handleError = (res: Response, message: string, error?: unknown) => {
    console.error(error);
    return res.status(500).json({ error: message });
};