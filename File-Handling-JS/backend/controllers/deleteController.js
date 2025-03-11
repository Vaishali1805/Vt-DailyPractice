const deleteFile = (req,res) => {
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

export {deleteFile}

// Check if file exists before deleting
// fs.access(filePath, fs.constants.F_OK, (err) => {
//   if (err) {
//       return res.status(404).json({ message: "File not found" });
//   }

//   // Delete the file
//   fs.unlink(filePath, (err) => {
//       if (err) {
//           return res.status(500).json({ message: "Error deleting file" });
//       }
//       res.json({ message: "File deleted successfully!" });
//   });
// });