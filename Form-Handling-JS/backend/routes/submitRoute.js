import express from 'express'
const router = express.Router();
import {submitFormData} from '../controllers/submitController.js'

router.post('/formData',submitFormData);

export default router;