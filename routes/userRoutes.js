import express from 'express';
import { getUsers, deleteUser, createUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/:userId?', getUsers);

router.delete('/:userId', deleteUser);

router.post('/', createUser);

export default router;