import express from 'express'
const router = express.Router();
import { getFormData } from '../controllers/getDataController.js';

router.get('/formData',getFormData);

export default router;