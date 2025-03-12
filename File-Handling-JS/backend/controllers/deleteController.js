import path from 'path'
import fs from 'fs'
import { error } from 'console';

const __dirname = path.resolve();

export function deleteFile(req,res){
    const fileName = req.body.name;
    // console.log("fileName: ",fileName);
    const filePath = path.join(__dirname,"uploads","singleUploads",fileName);
    // console.log("filePath: ",filePath)

    //Check file exists or not
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if(err){
        return res.status(404).json({error: "File Not found"});
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(404).json({error: "Error deleting file"});
        } else {
          res.send("File deleted successfully");
        }
      });
    })

    // res.send("File deleted successfully");
}

// export {deleteFile}