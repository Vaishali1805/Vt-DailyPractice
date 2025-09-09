import express from 'express';
const router = express.Router();
import { handleVerifyEmail } from '../controllers/authController.js'

router.post('/verifyEmail', handleVerifyEmail)

export default router;