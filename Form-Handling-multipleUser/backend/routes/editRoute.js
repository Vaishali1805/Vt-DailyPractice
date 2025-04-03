import express from 'express'
import multer from 'multer';
import { editFormData } from '../controllers/editController.js';
import { handleProfileUpload } from '../middlewares/handleEditProfile.js';

const router = express.Router();

//Multer setup
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads')
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname)
    }
})

const uploadProfile = multer({ storage });
router.post('/formData', uploadProfile.single('profile'), handleProfileUpload, editFormData);

export default router;