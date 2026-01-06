import express, { Request, Response } from 'express';
import { handleError } from "../utils/handleError"
import prisma from '../prisma/prisma';

const router = express.Router();

/**
 * GET /api/repairs/
 *
 * Retrieves all repair jobs from database.
 *
 * @route GET /
 * @returns {Repair[]} Array of repair job objects.
 * @throws {500} Internal server error if database query fails.
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.repair.findMany();
        return res.json(jobs);
    } catch (error) {
        handleError(res, 'Failed to fetch repairs', error);
    }
});

/**
 * GET /api/repairs/installed/
 *
 * Retrieves all repair jobs with an install date from the database.
 *
 * @route GET /installed
 * @returns {Repair[]} Array of repair job objects.
 * @throws {500} Internal server error if database query fails.
 */
router.get('/installed', async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.repair.findMany({
            where: {
                installDate: {
                    not: null
                }
            }
        });
        return res.json(jobs);
    } catch (error) {
        handleError(res, 'Failed to fetch job', error);
    }
});

/**
 * GET /api/repairs/:jobName
 *
 * Retrieves the repair job with the specified name from the database.
 *
 * @route GET /:jobName
 * @param {string} jobName - Name of the repair job.
 * @returns {Repair} Repair job with specified job name.
 * @throws {404} Not found error if no repair job with the specified name exists.
 * @throws {500} Internal server error if database query fails.
 */
router.get('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const job = await prisma.repair.findUnique({ where: { jobName } });
        if (!job) return res.status(404).json({ error: 'Repair not found' });
        return res.json(job);
    } catch (error) {
        handleError(res, 'Failed to fetch repair', error);
    }
});

/**
 * POST /api/repairs/
 *
 * Adds a new repair job to the database.
 *
 * @route POST /
 * @param {Object} body - Repair job data.
 * @param {string} body.jobName - Unique name for the repair job (required).
 * @param {string} [body.installDate] - Scheduled installation date (YYYY-MM-DD format).
 * @param {string} [body.installedBy] - Name of installer.
 * @param {boolean} [body.changeOrder] - Whether job requires change order.
 * @param {string} [body.notes] - Additional notes about the repair job.
 * @returns {Repair} Created repair job object with generated ID.
 * @throws {400} Bad request error if jobName is missing.
 * @throws {409} Conflict error if jobName already exists.
 * @throws {500} Internal server error if database query fails.
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (!data.jobName) {
            return res.status(400).json({
                error: "MISSING_JOB_NAME",
                message: "Job name is required"
            });
        }

        const existingJob = await prisma.repair.findFirst({
            where: { jobName: data.jobName }
        });

        if (existingJob) {
            return res.status(409).json(
                { error: "DUPLICATE_JOB_NAME", message: "A job with this name already exists" },
            );
        }

        const newRepair = await prisma.repair.create({
            data: {
                ...data,
                jobName: req.body.jobName.trim(),
            },
        });;
        return res.status(201).json(newRepair);
    } catch (error) {
        handleError(res, 'Failed to create repair', error);
    }
});

/**
 * PUT /api/repairs/:jobName
 *
 * Updates an existing repair job by job name.
 *
 * @route PUT /:jobName
 * @param {string} jobName - Name of the repair job to update.
 * @param {Object} body - Updated repair job data.
 * @param {string} [body.jobName] - Updated job name.
 * @param {string} [body.installDate] - Updated installation date (YYYY-MM-DD format).
 * @param {string} [body.installedBy] - Updated installer name.
 * @param {boolean} [body.changeOrder] - Updated change order status.
 * @param {string} [body.notes] - Updated notes.
 * @returns {Repair} Updated repair job object.
 * @throws {404} Not found error if repair job doesn't exist.
 * @throws {500} Internal server error if database query fails.
 */
router.put('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const data = req.body;
        const updatedRepair = await prisma.repair.update({
            where: { jobName },
            data
        });
        return res.status(200).json(updatedRepair);
    } catch (error) {
        handleError(res, 'Failed to update repair', error);
    }
});

/**
 * DELETE /api/repairs/:jobName
 *
 * Deletes a repair job from the database by job name.
 *
 * @route DELETE /:jobName
 * @param {string} jobName - Name of the repair job to delete.
 * @returns {Repair} Deleted repair job object.
 * @throws {404} Not found error if repair job doesn't exist.
 * @throws {500} Internal server error if database query fails.
 */
router.delete('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const deletedRepair = await prisma.repair.delete({ where: { jobName } });
        return res.status(200).json(deletedRepair);
    } catch (error) {
        handleError(res, 'Failed to delete repair', error);
    }
});

export default router;