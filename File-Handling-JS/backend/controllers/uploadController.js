import myCache from '../myCache.js';

const uploadSingleFile = (req,res) => {

    console.log("req.file",req.file);
    const fileId = Date.now();
    
    myCache.set(fileId,req.file.path);

    const result = myCache.has(fileId);
    console.log("result: ",result);
    const value = myCache.get(fileId);
    console.log("value: ",value);
    const keys = myCache.keys();
    console.log("keys: ",keys);

    res.send("File uploaded successfully");
}

const uploadMultipleFiles = (req,res) => {
    console.log("req.files: ",req.files);
    res.send("upload multiple files");
}

export {uploadMultipleFiles,uploadSingleFile}
