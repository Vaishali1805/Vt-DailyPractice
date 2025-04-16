import express from 'express'
const router = express.Router();
import multer from 'multer'
import fs from 'fs';
import { submitFormData,getStudentData,getDataById,getLocationData,editFormData,deleteStudentRecords } from '../controllers/userController.js';

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

const uploadProfile = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
  });
router.post('/submit/formData',uploadProfile.single('profile'),submitFormData);
router.post('/edit/formData', uploadProfile.single('profile'),editFormData);
router.get('/get/studentData',getStudentData);
router.get('/get/dataById',getDataById);
router.get('/get/locationData',getLocationData);
router.post('/delete/studentRecord',deleteStudentRecords);

export default router;