import express from 'express';
import { getRecords, createRecord, deleteRecord } from '../controllers/recordController.js';

const router = express.Router();

router.get('/:recordId?', getRecords);

router.delete('/:recordId', deleteRecord);

router.post('/', createRecord);

export default router;