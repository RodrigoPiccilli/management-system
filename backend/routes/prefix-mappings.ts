import express, { Request, Response } from 'express';
import { handleError } from "../utils/handleError"
import prisma from '../prisma/prisma';

const router = express.Router();

// Get all mappings
router.get('/', async (req: Request, res: Response) => {
    try {
        const mappings = await prisma.prefixMapping.findMany();
        res.json(mappings);
    } catch (error) {
        handleError(res, 'Failed to load mappings', error);
    }
});

// Get Mapping Based on Prefix
router.get('/:prefix', async (req: Request, res: Response) => {
    try {
        const { prefix } = req.params;
        const community = await prisma.prefixMapping.findUnique({ where: { prefix } });
        if (!community) return res.status(404).json({ error: 'Prefix does not exist.' });
        return res.json(community);
    } catch (error) {
        handleError(res, 'Failed to fetch prefix.', error);
    }
});

// Add or update a mapping
router.post('/', async (req: Request, res: Response) => {
    const { prefix, community } = req.body;
    if (!prefix || !community) {
        handleError(res, 'Prefix and Community Required');
    }

    try {
        const mapping = await prisma.prefixMapping.upsert({
            where: { prefix },
            update: { community },
            create: { prefix, community }
        });
        return res.json(mapping);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save mapping' });
    }
});

export default router;
