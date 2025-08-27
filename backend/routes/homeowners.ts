import express, { Request, Response } from 'express';
import { handleError } from "../utils/handleError"
import prisma from '../prisma/prisma';

const router = express.Router();

/**
* GET /api/homeowners/
*
* Retrieves all homeowner jobs from database.
*
* @route GET /
* @returns {HomeownerJob[]} Array of homeowner job objects.
* @throws {500} Internal server error if database query fails.
*/
router.get('/', async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.homeownerJob.findMany();
        return res.json(jobs);
    } catch (error) {
        handleError(res, 'Failed to fetch jobs', error);
    }
});

/**
 * GET /api/homeowners/installed/
 *
 * Retrieves all homeowner jobs with an install date from the database.
 *
 * @route GET /installed
 * @returns {HomeownerJob[]} Array of homeowner job objects.
 * @throws {500} Internal server error if database query fails.
 */
router.get('/installed', async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.homeownerJob.findMany({
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
 * GET /api/homeowners/from/:from/to/:to
 *
 * Retrieves all homeowner jobs within specified date range from database.
 *
 * @route GET /from/:from/to/:to
 * @param {string} from - Start date in YYYY-MM-DD format (local timezone).
 * @param {string} to - End date in YYYY-MM-DD format (local timezone, inclusive of entire day).
 * @returns {HomeownerJob[]} Array of homeowner job objects ordered by install date (ascending).
 * @throws {400} Bad request error if date format is invalid.
 * @throws {500} Internal server error if database query fails.
 */
router.get('/from/:from/to/:to', async (req: Request, res: Response) => {
    try {
        const { from, to } = req.params;

        const fromDate = new Date(from);
        const toDate = new Date(to);


        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const endOfToDate = new Date(toDate);
        endOfToDate.setHours(23, 59, 59, 999);


        const jobs = await prisma.homeownerJob.findMany({
            where: {
                installDate: {
                    gte: fromDate,
                    lte: endOfToDate,
                }
            },
            orderBy: {
                installDate: 'asc'
            },
        });

        return res.json(jobs);


    } catch (error) {
        handleError(res, 'Failed to fetch jobs in date range', error);
    }
});

/**
 * GET /api/homeowners/:jobName
 *
 * Retrieves the homeowner job with the specified name from the database.
 *
 * @route GET /:jobName
 * @param {string} jobName - Name of the Job.
 * @returns {HomeownerJob} Homeowner Job with specified job name.
 * @throws {404} Not found error if no job with the specified name exists.
 * @throws {500} Internal server error if database query fails.
 */
router.get('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const job = await prisma.homeownerJob.findUnique({ where: { jobName } });
        if (!job) return res.status(404).json({ error: 'Job not found' });
        return res.json(job);
    } catch (error) {
        handleError(res, 'Failed to fetch job', error);
    }
});

/**
 * POST /api/homeowners/
 *
 * Adds a new homeowner job to the database.
 *
 * @route POST /
 * @param {Object} body - Homeowner job data.
 * @param {string} body.jobName - Unique name for the homeowner job (required).
 * @param {string} [body.installDate] - Scheduled installation date (YYYY-MM-DD format).
 * @param {string} [body.installedBy] - Name of installer.
 * @param {boolean} [body.changeOrder] - Whether job requires change order.
 * @param {string} [body.notes] - Additional notes about the job.
 * @returns {HomeownerJob} Created homeowner job object with generated ID.
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

        const existingJob = await prisma.homeownerJob.findFirst({
            where: { jobName: data.jobName }
        });


        if (existingJob) {
            return res.status(409).json(
                { error: "DUPLICATE_JOB_NAME", message: "A job with this name already exists" },
            );
        }
        const newJob = await prisma.homeownerJob.create({ data });
        return res.status(201).json(newJob);
    } catch (error) {
        handleError(res, 'Failed to create job', error);
    }
});

/**
 * PUT /api/homeowners/:jobName
 *
 * Updates an existing homeowner job by job name.
 *
 * @route PUT /:jobName
 * @param {string} jobName - Name of the homeowner job to update.
 * @param {Object} body - Updated homeowner job data.
 * @param {string} [body.jobName] - Updated job name.
 * @param {string} [body.installDate] - Updated installation date (YYYY-MM-DD format).
 * @param {string} [body.installedBy] - Updated installer name.
 * @param {boolean} [body.changeOrder] - Updated change order status.
 * @param {string} [body.notes] - Updated notes.
 * @returns {HomeownerJob} Updated homeowner job object.
 * @throws {404} Not found error if homeowner job doesn't exist.
 * @throws {500} Internal server error if database query fails.
 */
router.put('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const data = req.body;
        const updatedJob = await prisma.homeownerJob.update({
            where: { jobName },
            data
        });
        return res.status(200).json(updatedJob);
    } catch (error) {
        handleError(res, 'Failed to update job', error);
    }
});

/**
 * DELETE /api/homeowners/:jobName
 *
 * Deletes a homeowner job from the database by job name.
 *
 * @route DELETE /:jobName
 * @param {string} jobName - Name of the homeowner job to delete.
 * @returns {HomeownerJob} Deleted homeowner job object.
 * @throws {404} Not found error if homeowner job doesn't exist.
 * @throws {500} Internal server error if database query fails.
 */
router.delete('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const deletedJob = await prisma.homeownerJob.delete({ where: { jobName } });
        return res.status(200).json(deletedJob);
    } catch (error) {
        handleError(res, 'Failed to delete job', error);
    }
});


export default router;