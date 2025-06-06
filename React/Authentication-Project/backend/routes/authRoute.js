import express from 'express';
const router = express.Router();
import multer from 'multer'
import { handleRegister,handleLogin,getUserData,handleDelete,handleEdit,handleImagesUpload } from '../controllers/authController.js'
import { verifyToken } from '../middlewares/verifyToken.js';

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads');
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname);
    }
})

const upload = multer({ storage });

router.get('/getUserData',verifyToken,getUserData);
router.post('/registerUser',handleRegister);
router.post('/loginUser',handleLogin);
router.post('/deleteUserData',verifyToken,handleDelete);
router.post('/editUserData',verifyToken,upload.single("file"),handleEdit);
router.post('/uploadImages',verifyToken,upload.array("files"),handleImagesUpload);

export default router;