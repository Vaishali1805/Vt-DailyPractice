import express from 'express';
const router = express.Router();
import multer from 'multer'
import {uploadMultipleFiles,uploadSingleFile} from '../controllers/uploadController.js';

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/singleUploads');
    },
    filename: (req,file,cb) => {
        // const fileExtension = path.extname(file.originalname);       //no need
        let fileName = `${Date.now()}+${file.originalname}`;
        cb(null,fileName);
    }
})

const storage2 = multer.diskStorage({
    destination: (req,file,cb) => {     
        cb(null,'uploads/multiUploads');
    },
    filename: (req,file,cb) => {
        // const fileExtension = path.extname(file.originalname);       //no need
        let fileName = `${Date.now()}+${file.originalname}`;
        cb(null,fileName);
    }
})

const singleUpload = multer({ storage });
const multipleUpload = multer({ storage2 });

router.post('/singleFile',singleUpload.single('fileChunk'),uploadSingleFile);
router.post('/multipleFiles',multipleUpload.single('fileChunk'),uploadMultipleFiles);

export default router;