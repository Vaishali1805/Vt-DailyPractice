import express from 'express'
const router = express.Router();
import multer from 'multer'
import { submitFormData,getStudentData,getCountries,getDataById,getStates,getCities,editFormData,deleteStudentRecord,deleteManyStudentRecords } from '../controllers/userController.js';
import {handleProfileUpload,handleEditProfile} from '../middlewares/userProfile.js'

// make directory
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
router.post('/delete/studentRecord',deleteManyStudentRecords);
// router.post('/delete/bulkDelete',deleteManyStudentRecords);

export default router;