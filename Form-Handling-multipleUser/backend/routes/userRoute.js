import express from 'express'
const router = express.Router();
import multer from 'multer'
import fs from 'fs';
import { submitFormData,getStudentData,getCountries,getDataById,getStates,getCities,editFormData,deleteStudentRecords } from '../controllers/userController.js';
import {handleProfileUpload,handleEditProfile} from '../middlewares/userProfile.js'

// Create 'uploads' directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads')
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname)
    }
})
const editStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads')
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname)
    }
})

const uploadProfile = multer({ storage: storage });
const uploadEditProfile = multer({ storage: editStorage });
router.post('/submit/formData',uploadProfile.single('profile'),handleProfileUpload,submitFormData);
router.get('/get/studentData',getStudentData);
router.get('/get/dataById',getDataById);
router.get('/get/countries',getCountries);
router.get('/get/states',getStates);
router.get('/get/cities',getCities);
router.post('/edit/formData', uploadEditProfile.single('profile'), handleEditProfile, editFormData);
router.post('/delete/studentRecord',deleteStudentRecords);

export default router;