import express from 'express'
const router = express.Router();
import { verifyToken } from '../middlewares/verifyToken.js';
import { getUserData, handleDelete, handleEdit, handleImagesUpload, handleUploadVideo } from '../controllers/userController.js';
import { chunkUploader, imageUploader, profileUploader } from '../utils/multerConfig.js';


router.get('/getUserData',verifyToken ,getUserData);
router.post('/deleteUserData',verifyToken,handleDelete);
router.post('/editUserData',verifyToken,profileUploader.single("file"),handleEdit);
router.post('/uploadImages',verifyToken,imageUploader.array("files"),handleImagesUpload);
router.post("/uploadVideos",verifyToken,chunkUploader.single('chunk'), handleUploadVideo);
export default router;