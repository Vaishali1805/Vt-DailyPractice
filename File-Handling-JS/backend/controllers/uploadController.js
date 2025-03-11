const uploadSingleFile = (req,res) => {
    console.log("req.file",req.file);
    res.send("File uploaded successfully");
}

const uploadMultipleFiles = (req,res) => {
    console.log("req.files: ",req.file);
}

export  {uploadMultipleFiles,uploadSingleFile}
