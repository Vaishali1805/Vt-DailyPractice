import express from 'express';
const router = express.Router();
import {deleteFile} from '../controllers/deleteController.js'

router.post('/delete',deleteFile);

export default router;