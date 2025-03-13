import path from 'path'
import fs from 'fs'
import myCache from '../myCache.js'

const __dirname = path.resolve();       //to prevent the error that __dirname is not defined

const getSingleUploadedFiles = (req, res) => {
    // myCache.get()

    res.send("files retrieved successfully");
    //get files from uploads folder and send it to frontend
    // const filesPath = path.join(__dirname, "uploads", "singleUploads");
    // fs.readdir(filesPath, (err, files) => {
    //     if (err)
    //         return res.status(500).json({ error: "Unable to fetch files" });

    //     // let arr = files.map((file,index) => ({fileLoc : filesPath + file}))   //when you access the fileLoc at the frontend then first replace('//' to a single slash )
    //     let arr = files.map((file) => {
    //         return {
    //             // id: Date.now(),      //generate same id for all
    //             id: `${Date.now()}-${Math.random()}`,
    //             name: file,
    //             fileLoc: `/uploads/singleUploads/${file}`   //Relative path
    //             // fileLoc: path.join(filesPath, file),
    //         };
    //     });
        
    //     res.json(arr);
    // })
}

export { getSingleUploadedFiles }