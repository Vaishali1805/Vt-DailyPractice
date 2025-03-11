import express from 'express';
const router = express.Router();
import { getSingleUploadedFiles } from '../controllers/getFilesController.js'

router.get('/singleFiles',getSingleUploadedFiles);

export default router;