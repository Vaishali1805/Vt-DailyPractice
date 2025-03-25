import myCache from "../myCache.js";

const submitFormData = (req,res) => {

    const {formData} = req.body;
    console.log("formData: ",formData);
    myCache.set("submittedData",formData);

    // let data = myCache.get("submittedData");
    // console.log("data: ",data);

    res.json({message: "data submitted successfully"});
}

export {submitFormData};