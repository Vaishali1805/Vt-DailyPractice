import myCache from "../myCache.js";
import path from 'path'
import fs from 'fs'
const __dirname = path.resolve();

const submitFormData = (req, res) => {
    console.log("in submitFormData")
    const {formData} = req.body;
    
    const data = JSON.parse(formData);
    myCache.set("submittedData",data);

    // const filePath = path.join(__dirname,req.file.path);
    // console.log("🚀 ~ submitFormData ~ filePath:", filePath);

    let fileData = {
        filename: req.file.originalname,
        path: req.file.path,
    };

    myCache.set("profilePic",fileData);

    // let data = myCache.get("submittedData");
    // console.log("data: ",data);

    // let file = myCache.get("profilePic")
    // console.log("file: ",file);

    res.json({ message: "data submitted successfully" });
}

export { submitFormData };