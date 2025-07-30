import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Get All NVR Jobs
router.get('/', async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.nVRJob.findMany();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Get NVR Job by Job Name
router.get('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const job = await prisma.nVRJob.findUnique({ where: { jobName } });
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch job' });
    }
});

// Add NVR Job
router.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const newJob = await prisma.nVRJob.create({ data });
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
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
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update job' });
    }
});

// Delete NVR Job
router.delete('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const deletedJob = await prisma.nVRJob.delete({ where: { jobName } });
        res.status(200).json(deletedJob);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job' });
    }
});

export default router;
