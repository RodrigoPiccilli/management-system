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

// Add Mapping
router.post('/', async (req: Request, res: Response) => {
    const { prefix, community, areaCode } = req.body;

    if(!prefix || !community || !areaCode) {
        return res.status(400).json({
            error: "MISSING_ATTRIBUTE",
            message: "All Fields are Required!"
        })
    }

    const existingMapping = await prisma.prefixMapping.findFirst({
        where: {prefix: prefix}
    });

    if(existingMapping) {
        return res.status(409).json({
            error: "DUPLICATE_MAPPING",
            message: "Community Already Exists!"
        })
    }

    try {
        const mapping = await prisma.prefixMapping.upsert({
            where: { prefix },
            update: { community, areaCode },
            create: { prefix, community, areaCode }
        });
        return res.json(mapping);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save mapping' });
    }
});

export default router;
