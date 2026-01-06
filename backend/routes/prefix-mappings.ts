import express, { Request, Response } from 'express';
import { handleError } from "../utils/handleError"
import prisma from '../prisma/prisma';
import { PrefixMapping } from '@prisma/client';

const router = express.Router();

/**
 * GET /api/prefix-mappings/
 *
 * Retrieves all prefix mappings from database.
 *
 * @route GET /
 * @returns {PrefixMapping[]} Array of prefix mapping objects.
 * @throws {500} Internal server error if database query fails.
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const mappings = await prisma.prefixMapping.findMany();
        return res.json(mappings);
    } catch (error) {
        handleError(res, 'Failed to load mappings', error);
    }
});

/**
 * GET /api/prefix-mappings/:prefix
 *
 * Retrieves a specific prefix mapping by prefix from the database.
 *
 * @route GET /:prefix
 * @param {string} prefix - The prefix to search for.
 * @returns {PrefixMapping} Prefix mapping object with specified prefix.
 * @throws {404} Not found error if prefix does not exist.
 * @throws {500} Internal server error if database query fails.
 */
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

/**
 * POST /api/prefix-mappings/
 *
 * Adds a new prefix mapping to the database.
 *
 * @route POST /
 * @param {Object} body - Prefix mapping data.
 * @param {string} body.prefix - Unique prefix identifier (required).
 * @param {string} body.community - Community name associated with prefix (required).
 * @param {string} body.areaCode - Area code for the community (required).
 * @returns {PrefixMapping} Created or updated prefix mapping object.
 * @throws {400} Bad request error if required fields are missing.
 * @throws {409} Conflict error if prefix already exists.
 * @throws {500} Internal server error if database query fails.
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { prefix, community, areaCode } = req.body;

        if (!prefix || !community || !areaCode) {
            return res.status(400).json({
                error: "MISSING_ATTRIBUTE",
                message: "All Fields are Required!"
            });
        }

        const existingMapping = await prisma.prefixMapping.findFirst({
            where: { prefix: prefix }
        });

        if (existingMapping) {
            return res.status(409).json({
                error: "DUPLICATE_MAPPING",
                message: "Community Already Exists!"
            });
        }

        const mapping = await prisma.prefixMapping.upsert({
            where: { prefix },
            update: { community, areaCode },
            create: { prefix, community, areaCode }
        });

        return res.status(201).json(mapping);
    } catch (error) {
        handleError(res, 'Failed to save mapping', error);
    }
});

export default router;