import express from 'express';
const router = express.Router();
import { handleRegister,handleLogin,getUserData,handleDelete,handleEdit,verifyLogin } from '../controllers/authController.js'
import { verifyToken } from '../middlewares/verifyToken.js';

router.get('/get/userData',verifyToken,getUserData);
router.post('/registerUser',handleRegister);
router.post('/loginUser',handleLogin);
router.post('/delete/userData',verifyToken,handleDelete);
router.post('/edit/userData',verifyToken,handleEdit);
router.post('/checkToken',verifyToken,verifyLogin);

export default router;