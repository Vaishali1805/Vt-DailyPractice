import express from 'express';
const router = express.Router();
import { handleRegister,handleLogin,getUserData,handleDelete,handleEdit,handleWelcome } from '../controllers/authController.js'
import { verifyLogin } from '../middlewares/verifyLogin.js'

router.get('/get/userData',getUserData);
router.post('/register/user',handleRegister);
router.post('/login/user',handleLogin);
router.post('/delete/userData',handleDelete);
router.post('/edit/userData',handleEdit);
// router.post('/welcome/user',verifyLogin,handleWelcome);

export default router;