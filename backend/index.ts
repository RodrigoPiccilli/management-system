import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';

import nvrRoutes from './routes/nvr';
import homeownerRoutes from './routes/homeowners';

const app = express();
const BACKEND_URL = process.env.BACKEND_URL;

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Backend is running: ${BACKEND_URL}`);
});

app.use('/api/nvr', nvrRoutes);
app.use('/api/homeowners', homeownerRoutes);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
