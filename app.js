import express from 'express';
import cors from 'cors';

import healthCheckRoutes from './routes/healthCheck.js';

const app = express();

app.use(healthCheckRoutes);

export default app;