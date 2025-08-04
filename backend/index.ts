import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import nvrRoutes from './routes/nvr';
import homeownerRoutes from './routes/homeowners';

const app = express();

app.use(cors({
    origin: true,        
    credentials: true    
}));

app.use(express.json());

app.use('/api/nvr', nvrRoutes);
app.use('/api/homeowners', homeownerRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
