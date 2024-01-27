import express from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);

router.post('/', createCategory);

router.delete('/', deleteCategory);

export default router;