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
        // let fileName = `${Date.now()}_${file.originalname}`;
        let fileName = file.originalname;
        cb(null,fileName);
    }
})

const storage2 = multer.diskStorage({
    destination: (req,file,cb) => {     
        cb(null,'uploads/multiUploads');
    },
    filename: (req,file,cb) => {
        // const fileExtension = path.extname(file.originalname);       //no need
        // let fileName = `${Date.now()}_${file.originalname}`;
        let fileName = file.originalname;
        cb(null,fileName);
    }
})

const singleUpload = multer({ storage });
router.post('/singleFile',singleUpload.single('fileChunk'),uploadSingleFile);

const multipleUpload = multer({ storage: storage2 });
router.post('/multipleFiles',multipleUpload.array('files'),uploadMultipleFiles);

export default router;