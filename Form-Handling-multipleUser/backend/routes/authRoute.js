import express from 'express';
const router = express.Router();
import { handleRegister,handleLogin,handleWelcome } from '../controllers/authController.js'
import { verifyLogin } from '../middlewares/verifyLogin.js'

router.post('/register/user',handleRegister);
router.post('/login/user',handleLogin);
// router.post('/welcome/user',verifyLogin,handleWelcome);

export default router;