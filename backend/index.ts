/**
 * @fileoverview Main Express server application entry point.
 * Sets up middleware, routes, and starts the HTTP server.
 * 
 * @author Rodrigo Piccilli
 */

import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';

import nvrRoutes from './routes/nvr';
import homeownerRoutes from './routes/homeowners';
import contractorRoutes from './routes/contractors';
import repairRoutes from './routes/repairs';
import prefixMappings from './routes/prefix-mappings';


/**
 * Express application instance
 */
const app = express();

/**
 * Backend URL from environment variables
 */
const BACKEND_URL = process.env.BACKEND_URL;

/**
 * Configure CORS middleware to allow cross-origin requests
 * Allows all origins (origin: true)
 * Enables credentials for authentication
 */
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());

/**
 * Health check endpoint - returns server status
 * 
 * @route GET /
 * @returns {string} Server status message with backend URL
 */
app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Backend is running: ${BACKEND_URL}`);
});

/**
 * Homeowner job routes.
 * @route /api/homeowners/*
 */
app.use('/api/homeowners', homeownerRoutes);

/**
 * Contractor job routes.
 * @route /api/contractors/*
 */
app.use('/api/contractors', contractorRoutes);

/**
 * Repair job routes.
 * @route /api/repairs/*
 */
app.use('/api/repairs', repairRoutes);

/**
 * Prefix mapping routes.
 * @route /api/prefix-mappings/*
 */
app.use('/api/prefix-mappings', prefixMappings);

/**
 * Start the Express server and listen on the configured port
 * Logs startup confirmation message to console
 */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
