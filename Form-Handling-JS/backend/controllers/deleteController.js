import myCache from '../myCache.js'

const deleteFormData = (req,res) => {
    const {selectedFields} = req.body.obj;
    console.log("selectedFields: ",selectedFields);

    const data = myCache.get("submittedData");
    console.log("data:", data)

    const updatedObj = selectedFields.map((key) => delete data[key])
    console.log("data:", data);

    myCache.set("submittedData",data);

    res.json({ message: "Keys deleted Successfully"});
}
 
export {deleteFormData};