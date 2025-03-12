import express from 'express';
const router = express.Router();
import {deleteFile} from '../controllers/deleteController.js'

router.post('/file',deleteFile);

export default router;