import express from 'express';
import path from 'path'
import fs from 'fs'
const router = express.Router();

const app = express();
const __dirname = path.resolve();       //to prevent the error that __dirname is not defined

// app.use(express.static("uploads"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const getSingleUploadedFiles = (req, res) => {
    console.log("am in getSingleUploadedFiles");

    const filesPath = path.join(__dirname, "uploads", "singleUploads");
    console.log("path1: ", filesPath);

    fs.readdir(filesPath, (err, files) => {
        if (err)
            return res.status(500).json({ error: "Unable to fetch files" });

        console.log("files: ", files);
        console.log("file Path: ", filesPath);
        // let arr = files.map((file,index) => ({fileLoc : filesPath + file}))

        let arr = files.map((file) => {
            return { fileLoc: path.join(filesPath, file) };
            // return { fileLoc: `/uploads/singleUploads/${file}` };        //Try to solve the problem using relative path
        });
        
        console.log("arr: ", arr)
        res.json(arr);
    })
}

export { getSingleUploadedFiles }