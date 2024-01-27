import express from 'express';
import cors from 'cors';

import healthCheckRoutes from './routes/healthCheckRoutes.js';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import recordRoutes from './routes/recordRoutes.js';

const app = express();

global.users = new Map();
global.records = new Map();
global.categories = new Map();

app.use(healthCheckRoutes);

app.use('/user/',userRoutes);
app.use('/category/',categoryRoutes);
app.use('/record/',recordRoutes);

export default app;