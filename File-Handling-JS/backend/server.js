import express from 'express'
import cors from 'cors';
import multer from 'multer'
// import bodyParser from 'body-parser'

const PORT = 3500;
const app = express();

app.use(cors());

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/');
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname);
    }
})

const upload = multer({ storage });

app.post('/singleUpload', upload.single('file'),(req,res) => {
    console.log("req: ",req.file);
    res.send("File uploaded successfully");
})

app.listen(PORT,() => {
    console.log("server is running at PORT: ",PORT);
})

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