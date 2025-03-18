import path from 'path'
import fs from 'fs'
import { error } from 'console';
import myCache from '../myCache.js';

const __dirname = path.resolve();

export function deleteFile(req, res) {

  // delete the file from the cache
  const fileId = req.body.id;
  let fileName;
  let uploadedFiles = myCache.get("uploadedFiles")
  console.log("uploaded Files: ",uploadedFiles);

  const updatedArray = uploadedFiles.filter((file,index) => {
    if(fileId != file.id){
      return file;
    }else{
      fileName = file.filename;
    }
  })
  myCache.set("uploadedFiles",updatedArray);
  console.log("updatedArray: ",updatedArray);
  console.log("fileName: ",fileName);

  // delete the file from the directory
  const filePath = path.join(__dirname,"uploads","singleUploads",fileName);

  //Check file exists or not
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if(err){
      console.log("error: ",err);
      return res.status(404).json({error: "File Not found"});
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(404).json({error: "Error deleting file"});
      } else {
        res.json({message: "File deleted successfully",files: updatedArray});
      }
    }); 
  })
}

export function deleteFiles(req,res) {
  const fileId = req.body.id;
  let fileName;
  let files = myCache.get("multipleUploadedFiles");
  console.log("files: ",files);

  const updatedArray = files.filter((file,index) => {
    if(fileId != file.id){
      return file;
    }else{
      fileName = file.filename;
    }
  })

  myCache.set("multipleUploadedFiles",updatedArray);

  //delete file from the directory
  const filePath = path.join(__dirname,"uploads","multiUploads",fileName);

  //Check file exists or not
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if(err){
      console.log("error: ",err);
      return res.status(404).json({error: "File Not found"});
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(404).json({error: "Error deleting file"});
      } else {
        res.json({message: "File deleted successfully",files: updatedArray});
      }
    });
  })
}

export function deleteAllFiles(req,res) {
  console.log("req.body: ",req.body);
}

// export {deleteFile}