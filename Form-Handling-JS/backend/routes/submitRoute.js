import express from 'express'
const router = express.Router();
import multer from 'multer'
import {submitFormData} from '../controllers/submitController.js'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads')
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname)
    }
})

const uploadProfile = multer({ storage });
router.post('/formData',uploadProfile.single('profilePic'),submitFormData);
// router.post('/formData',submitFormData);

export default router;