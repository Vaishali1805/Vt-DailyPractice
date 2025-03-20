import express from 'express'
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

const PORT = 3500;
const app = express();

app.use(cors());
app.use(express.text());
app.use(express.json());
const __dirname = path.resolve(); 
// app.use(express.static("uploads"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));   //server static files

import uploadRoutes from  './routes/uploadRoutes.js'
import deleteRoutes from './routes/deleteRoutes.js'
import getFilesRoutes from './routes/getFilesRoutes.js'

app.use('/get',getFilesRoutes);
app.use('/upload',uploadRoutes);
app.use('/delete',deleteRoutes);

app.listen(PORT,() => {
    console.log("server is running at PORT: ",PORT);
})















// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null,'uploads/');
//     },
//     filename: (req,file,cb) => {
//         // const fileExtension = path.extname(file.originalname);       //no need
//         let fileName = `${Date.now()}${file.originalname}`;
//         cb(null,fileName);
//     }
// })

// const upload = multer({ storage });

// app.post('/UploadFile', upload.single('fileChunk'),(req,res) => {
//     console.log("req.file in submit",req.file);
//     res.send("File uploaded successfully");
// })

// app.post('/deleteFile',(req,res) => {
//     console.log("req ",req);
//     console.log("req.body: ",req.body)
//     console.log("req.file: ",req.file)
    // file path?
    // fs.unlink(filePath, (err) => {
    //     if (err) {
    //       console.error("Error deleting file:", err);
    //     } else {
    //       console.log("File deleted successfully");
    //     }
    //   });

//     res.send("File deleted successfully");
// })

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

// app.use(upload.array());             while multiple files are there
// let multerUploads = multer({storage: multerStorage, limits: { fileSize: 1024 * 1024 * 10 }})
// req.files for multiple file uploads
// const upload = multer({ dest: "uploads/" });
//app.use(upload());      //add this line to prevent the wrappedFileFilter error

// for validations
// const upload = multer({
//     storage,
//     limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
//     fileFilter: (req, file, cb) => {
//       if (!file.mimetype.startsWith('image/')) {
//         return cb(new Error('Only image files are allowed!'), false);
//       }
//       cb(null, true);
//     }
//   });