import express from 'express';
const router = express.Router();
import { handleRegister,handleLogin } from '../controllers/authController.js'

router.post('/register/user',handleRegister);
router.post('/login/user',handleLogin);

export default router;