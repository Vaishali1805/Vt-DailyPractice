import express from 'express'
const router = express.Router();
import {getStudentData,getCountries} from '../controllers/getDataConrtroller.js'; 

router.get('/studentData',getStudentData);
router.get('/countries',getCountries);

export default router;