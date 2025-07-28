import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

// Get All NVR Jobs
app.get('/api/nvr', async (req, res) => {
    try {
      const jobs = await prisma.nVRJob.findMany();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Get All Homeowner Jobs
app.get('/api/homeowners', async (req, res) => {
    try {
      const jobs = await prisma.hOJob.findMany();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});


// Get NVR Jobs by Job Name
app.get('/api/nvr/:jobName', async (req, res) => {
    try {
        const { jobName } = req.params;
        const job = await prisma.nVRJob.findUnique({
            where: {
                jobName: jobName,
            }
        })

      res.json(job);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job' });
    }
});

// Get Homeowner Jobs by Job Name
app.get('/api/homeowners/:jobName', async (req, res) => {
    try {
        const { jobName } = req.params;
        const job = await prisma.hOJob.findUnique({
            where: {
                jobName: jobName,
            }
        })

      res.json(job);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job' });
    }
});

// Add NVR Job
app.post('/api/nvr/add', async (req, res) => {
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

    const newJob = await prisma.nVRJob.create({
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

// Add Homeowner Job
app.post('/api/homeowners/add', async (req, res) => {
    try {
      const {
        jobName,
        stone,
        backsplash,
        installDate,
        ft2,
        address,
        sink,
        amount,
      } = req.body;
  
      const newJob = await prisma.hOJob.create({
        data: {
          jobName,
          stone,
          backsplash,
          installDate,
          ft2,
          address,
          sink,
          amount,
        }
      });
  
      res.status(201).json(newJob);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create job' });
    }
});

// Update NVR Job
app.put('/api/nvr/update/:jobName', async (req, res) => {
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

          const updatedJob = await prisma.nVRJob.update({
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

// Update Homeowner Job
app.put('/api/homeowners/update/:jobName', async (req, res) => {
    try {
        const { jobName } = req.params;

        const {
            stone,
            backsplash,
            installDate,
            ft2,
            address,
            sink,
            amount,
          } = req.body;

          const updatedJob = await prisma.hOJob.update({
            where: { jobName },
            data: {
              stone,
              backsplash,
              installDate,
              ft2,
              address,
              sink,
              amount,
            }
          });

          res.status(200).json(updatedJob);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update job' });
    }
});

// Delete NVR Job
app.delete('/api/nvr/delete/:jobName', async (req, res) => {
    try {
        const { jobName } = req.params;  

        const deletedJob = await prisma.nVRJob.delete({
            where: {
              jobName: jobName,
            },
          });

          res.status(200).json(deletedJob);
    } catch(error) {
        res.status(500).json({error: 'Failed to delete job' });
    }
});

// Delete Homeowner Job
app.delete('/api/homeowners/delete/:jobName', async (req, res) => {
    try {
        const { jobName } = req.params;  

        const deletedJob = await prisma.hOJob.delete({
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
