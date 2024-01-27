import express from 'express';
import { getCategories, createCategory, deleteAllCategories } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);

router.post('/', createCategory);

router.delete('/', deleteAllCategories);

export default router;