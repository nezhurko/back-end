import express from 'express';
import { userAuthRegister, userAuthLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', userAuthRegister);

router.post('/login', userAuthLogin);

export default router;