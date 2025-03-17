import myCache from "../myCache.js";
import { v4 as uuidv4 } from "uuid";    //UUID (universally unique identifier)  

const uploadSingleFile = (req, res) => {
  console.log("req.file", req.file);

  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  let fileData = {
    id: uuidv4(),
    filename: req.file.originalname,
    path: req.file.path,
  };

  console.log("fileData: ",fileData); 

  let uploadedFiles = myCache.get("uploadedFiles") || [];

  uploadedFiles.push(fileData);
  myCache.set("uploadedFiles", uploadedFiles, 3600); //1 hour

  let files = myCache.get("uploadedFiles");
  console.log("files: ",files);
  
  res.json({message: "File uploaded successfully",files: files});
  // res.json(files);
};

const uploadMultipleFiles = (req, res) => {
  console.log("req.files: ", req.files);

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  // Retrieve existing files from cache
  let multipleUploadedFiles = myCache.get("multipleUploadedFiles") || [];
  console.log("retrieved files: ",multipleUploadedFiles);

  const newFiles = req.files.map((file) => ({
    id: uuidv4(),
    filename: file.originalname,
    path: file.path,
  }))

  multipleUploadedFiles = [...multipleUploadedFiles, ...newFiles];
  myCache.set("multipleUploadedFiles", multipleUploadedFiles, 3600);  //expire after 1 hour
  console.log("uploadedFiles: ",multipleUploadedFiles);

  let files = myCache.get("multipleUploadedFiles");
  console.log("files: ",files);

  res.json({message: "File uploaded successfully",files: files});

};

export { uploadMultipleFiles, uploadSingleFile };

// const fileId = Date.now();

//     // myCache.set(fileId,req.file.path);

//     const result = myCache.has(fileId);
//     console.log("result: ",result);
//     const value = myCache.get(fileId);
//     console.log("value: ",value);
//     const keys = myCache.keys();
//     console.log("keys: ",keys);
