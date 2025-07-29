import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Get Homeowner Jobs with Install Dates
router.get('/', async (req: Request, res: Response) => {
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

export default router;
