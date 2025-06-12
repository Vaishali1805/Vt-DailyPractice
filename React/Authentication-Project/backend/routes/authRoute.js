import express from 'express';
const router = express.Router();
import { handleRegister,handleLogin } from '../controllers/authController.js'

router.post('/registerUser',handleRegister);
router.post('/loginUser',handleLogin);

export default router;