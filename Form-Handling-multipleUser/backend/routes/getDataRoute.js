import express from 'express'
const router = express.Router();
import {getStudentData} from '../controllers/getDataConrtroller.js'; 

router.get('/studentData',getStudentData);

export default router;