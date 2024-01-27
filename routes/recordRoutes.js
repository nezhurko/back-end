import express from 'express';
import { getRecords, createRecord, deleteRecord } from '../controllers/recordController.js';

const router = express.Router();

router.get('/', getRecords); //req.query.recordId && req.query.categoryId

router.delete('/:recordId', deleteRecord);

router.post('/', createRecord);

export default router;