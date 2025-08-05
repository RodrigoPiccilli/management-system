import express, { Request, Response } from 'express';
import { handleError } from "../utils/handleError"
import prisma from '../prisma/prisma';

const router = express.Router();

// Get All NVR Jobs
router.get('/', async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.nVRJob.findMany();
        return res.json(jobs);
    } catch (error) {
        handleError(res, 'Failed to fetch jobs', error);
    }
});

// Get NVR Jobs by Install Date Range
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

        const jobs = await prisma.nVRJob.findMany({
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
        handleError(res, 'Failed to fetch receivables', error);
    }
});

// Get NVR Job by Job Name
router.get('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const job = await prisma.nVRJob.findUnique({ where: { jobName } });
        if (!job) return res.status(404).json({ error: 'Job not found' });
        return res.json(job);
    } catch (error) {
        handleError(res, 'Failed to fetch job', error);
    }
});

// Add NVR Job
router.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const newJob = await prisma.nVRJob.create({ data });
        return res.status(201).json(newJob);
    } catch (error) {
        handleError(res, 'Failed to create job', error);
    }
});

// Update NVR Job
router.put('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const data = req.body;
        const updatedJob = await prisma.nVRJob.update({
            where: { jobName },
            data
        });
        return res.status(200).json(updatedJob);
    } catch (error) {
        handleError(res, 'Failed to update job', error);
    }
});

// Delete NVR Job
router.delete('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const deletedJob = await prisma.nVRJob.delete({ where: { jobName } });
        return res.status(200).json(deletedJob);
    } catch (error) {
        handleError(res, 'Failed to delete job', error);
    }
});

export default router;
