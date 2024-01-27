import express from 'express';
import { healthCheckStatus } from '../controllers/healthcheckController.js';

const router = express.Router();

router.get('/healthcheck', healthCheckStatus);

export default router;