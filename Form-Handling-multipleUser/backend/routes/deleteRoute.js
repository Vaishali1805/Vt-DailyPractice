import express from 'express'
const router = express.Router();
import { deleteStudentRecord,deleteManyStudentRecords } from '../controllers/deleteController.js';

router.post('/studentRecord',deleteStudentRecord);
router.post('/bulkDelete',deleteManyStudentRecords);

export default router;