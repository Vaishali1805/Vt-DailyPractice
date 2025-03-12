import path from 'path'
import fs from 'fs'

const __dirname = path.resolve();       //to prevent the error that __dirname is not defined

const getSingleUploadedFiles = (req, res) => {
    // console.log("am in getSingleUploadedFiles");

    const filesPath = path.join(__dirname, "uploads", "singleUploads");
    // console.log("path1: ", filesPath);

    fs.readdir(filesPath, (err, files) => {
        if (err)
            return res.status(500).json({ error: "Unable to fetch files" });

        // console.log("files: ", files);
        // console.log("file Path: ", filesPath);
        // let arr = files.map((file,index) => ({fileLoc : filesPath + file}))   //when you access the fileLoc at the frontend then first replace('//' to a single slash )

        let arr = files.map((file) => {
            return {
                // id: Date.now(),      //generate same id for all
                id: `${Date.now()}-${Math.random()}`,
                name: file,
                fileLoc: `/uploads/singleUploads/${file}`   //Relative path
                // fileLoc: path.join(filesPath, file),
            };
        });
        
        // console.log("arr: ", arr)
        res.json(arr);
    })
}

export { getSingleUploadedFiles }