import express from 'express'
const router = express.Router();
import multer from 'multer'
import { submitFormData } from '../controllers/submitController.js'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads')
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname)
    }
})

// Middleware to handle both file upload and string path
const handleProfileUpload = (req, res, next) => {
    if (req.file) {
        next();
    } else if (req.body.profile && typeof req.body.profile === 'string') {
        req.profilePath = req.body.profile;
        next();
    } else {
        req.profilePath = null;
        next();
    }
};

const uploadProfile = multer({ storage });
router.post('/formData',uploadProfile.single('profile'),handleProfileUpload,submitFormData);

export default router;