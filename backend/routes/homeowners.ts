import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Get All Homeowner Jobs
router.get('/', async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.homeownerJob.findMany();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Get Homeowner Jobs with Install Dates
router.get('/receivables', async (req: Request, res: Response) => {
    try {
      const jobs = await prisma.homeownerJob.findMany({
        where: {
          installDate: {
            not: null
          }
        }
      });
  
      res.json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch receivables' });
    }
  });

// Get Homeowner Job by Job Name
router.get('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const job = await prisma.homeownerJob.findUnique({ where: { jobName } });
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch job' });
    }
});

// Add Homeowner Job
router.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const newJob = await prisma.homeownerJob.create({ data });
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
});

// Update Homeowner Job
router.put('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const data = req.body;
        const updatedJob = await prisma.homeownerJob.update({
            where: { jobName },
            data
        });
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update job' });
    }
});

// Delete Homeowner Job
router.delete('/:jobName', async (req: Request, res: Response) => {
    try {
        const { jobName } = req.params;
        const deletedJob = await prisma.homeownerJob.delete({ where: { jobName } });
        res.status(200).json(deletedJob);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job' });
    }
});


export default router;
