import express from 'express'
const router = express.Router();
import {getStudentData,getCountries,getStates,getCities} from '../controllers/getDataConrtroller.js'; 

router.get('/studentData',getStudentData);
router.get('/countries',getCountries);
router.get('/states',getStates);
router.get('/cities',getCities);

export default router;