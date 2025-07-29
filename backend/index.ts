import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import nvrRoutes from './routes/nvr';
import homeownerRoutes from './routes/homeowners';
import receivablesRoutes from './routes/receivables';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/nvr', nvrRoutes);
app.use('/api/homeowners', homeownerRoutes);
app.use('/api/receivables', receivablesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
