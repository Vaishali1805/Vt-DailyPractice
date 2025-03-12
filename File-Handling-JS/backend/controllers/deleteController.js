export function deleteFile(req,res){
    console.log("req.file",req.file);
    // file path?
    fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully");
        }
      });
    res.send("File deleted successfully");
}

// export {deleteFile}