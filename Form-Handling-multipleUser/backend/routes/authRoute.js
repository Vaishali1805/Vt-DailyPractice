import express from 'express';
const router = express.Router();
import { handleRegister } from '../controllers/authController.js'

router.post('/register/user',handleRegister);

export default router;