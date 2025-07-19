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

// Get All Jobs
app.get('/api/jobs', async (req, res) => {
    try {
      const jobs = await prisma.job.findMany();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});


// Get Job by Job Name
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

// Add Job
app.post('/api/jobs/add', async (req, res) => {
  try {
    const {
      jobName,
      areaCode,
      model,
      direction,
      stone,
      backsplash,
      installDate,
      ft2,
      community,
      address,
      sink,
      amount,
      poNumber
    } = req.body;

    const newJob = await prisma.job.create({
      data: {
        jobName,
        areaCode,
        model,
        direction,
        stone,
        backsplash,
        installDate,
        ft2,
        community,
        address,
        sink,
        amount,
        poNumber
      }
    });

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// Update Job
app.put('/api/jobs/update/:jobName', async (req, res) => {
    try {
        const { jobName } = req.params;

        const {
            areaCode,
            model,
            direction,
            stone,
            backsplash,
            installDate,
            ft2,
            community,
            address,
            sink,
            amount,
            poNumber
          } = req.body;

          const updatedJob = await prisma.job.update({
            where: { jobName },
            data: {
              areaCode,
              model,
              direction,
              stone,
              backsplash,
              installDate,
              ft2,
              community,
              address,
              sink,
              amount,
              poNumber
            }
          });

          res.status(200).json(updatedJob);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update job' });
    }
});

// Delete Job
app.delete('/api/jobs/delete/:jobName', async (req, res) => {
    try {
        const { jobName } = req.params;  

        const deletedJob = await prisma.job.delete({
            where: {
              jobName: jobName,
            },
          });

          res.status(200).json(deletedJob);
    } catch(error) {
        res.status(500).json({error: 'Failed to delete job' });
    }
});










const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
