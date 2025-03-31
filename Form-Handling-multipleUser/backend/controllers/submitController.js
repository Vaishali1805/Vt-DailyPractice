import myCache from "../myCache.js";

export const submitFormData = (req, res) => {
    console.log("am in submitFormData");
    const { formData } = req.body;
    const data = JSON.parse(formData);
    console.log("data: ", data);

    let file;
    if (req.file) {
        file = req.file;
        console.log("file:", file);
    } else {
        file = req.profilePath;
        console.log("file:", file);
    }

    data.profile = file;
    console.log("data: ",data);

    const studentData = myCache.get("studentData") || [];
    studentData.push(data);
    myCache.set("studentData", studentData);

    console.log("🚀 ~ submitFormData ~ studentData:", studentData)
    res.json("Data submitted Successfully");
}
