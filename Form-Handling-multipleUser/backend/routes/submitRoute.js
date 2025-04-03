import express from 'express'
const router = express.Router();
import multer from 'multer'
import { submitFormData } from '../controllers/submitController.js'
import { handleProfileUpload } from '../middlewares/handleProfileUpload.js'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads')
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname)
    }
})

const uploadProfile = multer({ storage });
router.post('/formData',uploadProfile.single('profile'),handleProfileUpload,submitFormData);

export default router;