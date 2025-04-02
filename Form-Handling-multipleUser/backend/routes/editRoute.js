import express from 'express'
import multer from 'multer';
import { editFormData } from '../controllers/editController.js';

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

//Middleware to handle both if file is upload or not
const handleProfileUpload = (req, res, next) => {
    if (req.file) {
        console.log('File uploaded:', req.file.originalname);
        next();
    } else {
        console.log('No file uploaded, proceeding without file.');
        next();
    }
}

const uploadProfile = multer({ storage });
router.post('/formData', uploadProfile.single('profile'), handleProfileUpload, editFormData);

export default router;