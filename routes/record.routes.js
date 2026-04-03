import express from 'express';
import { getRecords, getRecordById, createRecord, updateRecord, deleteRecord } from '../controllers/record.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('Analyst', 'Admin'), getRecords)
  .post(protect, authorize('Admin'), createRecord);

router.route('/:id')
  .get(protect, authorize('Analyst', 'Admin'), getRecordById)
  .put(protect, authorize('Admin'), updateRecord)
  .delete(protect, authorize('Admin'), deleteRecord);

export default router;
