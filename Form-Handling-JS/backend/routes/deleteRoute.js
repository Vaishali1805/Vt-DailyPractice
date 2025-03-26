import express from 'express'
const router = express.Router();
import {deleteFormData} from '../controllers/deleteController.js'

router.post('/formData',deleteFormData);

export default router;