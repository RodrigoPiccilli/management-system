import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/api/jobs', async (req, res) => {
    try {
      const jobs = await prisma.job.findMany();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

app.get('/api/jobs/:jobName', async (req, res) => {
    try {
        const { jobName } = req.params;
        const job = await prisma.job.findUnique({
            where: {
                jobName: jobName,
            }
        })

      res.json(job);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job' });
    }
});











const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
