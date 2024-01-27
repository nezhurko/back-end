import express from 'express';
import cors from 'cors';

import healthCheckRoutes from './routes/healthCheckRoutes.js';

const app = express();

global.users = [];
global.records = [];
global.categories = [];

app.use(express.json());

app.use(healthCheckRoutes);
app.use('/user/',userRoutes);
app.use('/category/',categoryRoutes);
app.use('/record/',recordRoutes);

export default app;