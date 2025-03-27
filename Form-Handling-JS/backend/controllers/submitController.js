import myCache from "../myCache.js";
import path from 'path'
import fs from 'fs'
const __dirname = path.resolve();

const submitFormData = (req, res) => {
    console.log("in submitFormData")
    // const {formData} = req.body;
    const { FirstName, LastName, Email, ContactNo, Date_Of_Birth, Gender, StudentId, ParentName, ParentRel, ParentContactNo, ParentEmail, Address, Country, State, City } = req.body;

    const formData = {
        FirstName, LastName, Email, ContactNo, Date_Of_Birth, Gender, StudentId, ParentName, ParentRel, ParentContactNo, ParentEmail, Address, Country, State, City
    }
    console.log("formData: ",formData);
    myCache.set("submittedData",formData);

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