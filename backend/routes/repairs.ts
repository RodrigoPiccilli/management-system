import express, { Request, Response } from 'express';
import { handleError } from "../utils/handleError"
import prisma from '../prisma/prisma';

const router = express.Router();

// Get All Repair Jobs
router.get('/', async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.repair.findMany();
        return res.json(jobs);
    } catch (error) {
        handleError(res, 'Failed to fetch jobs', error);
    }
});

// Get Repair Job by Job Name
router.get('/:repairName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const job = await prisma.repair.findUnique({ where: { jobName } });
        if (!job) return res.status(404).json({ error: 'Job not found' });
        return res.json(job);
    } catch (error) {
        handleError(res, 'Failed to fetch job', error);
    }
});

// Add Repair Job
router.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const newRepair = await prisma.repair.create({ data });
        return res.status(201).json(newRepair);
    } catch (error) {
        handleError(res, 'Failed to create job', error);
    }
});

// Update Repair Job
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
        handleError(res, 'Failed to update job', error);
    }
});

// Delete Repair Job
router.delete('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const deletedRepair = await prisma.repair.delete({ where: { jobName } });
        return res.status(200).json(deletedRepair);
    } catch (error) {
        handleError(res, 'Failed to delete job', error);
    }
});

export default router;
