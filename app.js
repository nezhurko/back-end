import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import loggerMiddleware from './middleware/logger.js';

import healthCheckRoutes from './routes/healthCheckRoutes.js';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import recordRoutes from './routes/recordRoutes.js'; 
import userAuthRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

global.users = [];
global.records = [];
global.categories = [];

app.use(express.json());

app.use(loggerMiddleware);

app.use(healthCheckRoutes);

app.use('/user/auth/',userAuthRoutes);

app.use('/user/',userRoutes);
app.use('/category/',categoryRoutes);
app.use('/record/',recordRoutes);

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Bad request.' });
    } else if (err.type === 'entity.too.large') {
        return res.status(413).json({ error: 'Payload too large.' });
    }
    return res.status(500).json({ error: 'Oops! Something went wrong.' });
});

(async () => {
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const host = process.env.MONGODB_HOST;
    const dbName = process.env.MONGODB_DATABASE;

    //const connectionString = `mongodb://${username}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;
    const connectionString = `mongodb://${host}/${dbName}?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.log(error);
        console.error('Error connecting to MongoDB.');
    }
})();

export default app;