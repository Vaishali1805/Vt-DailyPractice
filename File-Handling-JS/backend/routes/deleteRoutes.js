import express from 'express';
const router = express.Router();
import {deleteFile,deleteFiles,deleteAllFiles} from '../controllers/deleteController.js'

//delete one by one
router.post('/file',deleteFile);    //file delete from singleUpload folder
router.post('/files',deleteFiles)    //file delete from multiuploads folder
router.post('/AllFiles',deleteAllFiles);   //delete files together

export default router;