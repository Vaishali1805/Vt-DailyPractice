import express from 'express';
const router = express.Router();
import { getSingleUploadedFiles,getMultipleUploadedFiles } from '../controllers/getFilesController.js'

router.get('/singleFiles',getSingleUploadedFiles);
router.get('/multipleFiles',getMultipleUploadedFiles);

export default router;