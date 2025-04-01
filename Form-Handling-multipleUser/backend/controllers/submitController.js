import myCache from "../myCache.js";

export const submitFormData = (req, res) => {
    try {
        const { formData } = req.body;
        const data = JSON.parse(formData);

        if(!data){
            return res.status(400).json({message: "Data not Found",success: false});
        }
        //In the studentData if id is already present then update the data where id matches

        let file;
        if (req.file) {
            file = req.file;
        } else {
            file = req.profilePath;
        }

        data.profile = file;

        const studentData = myCache.get("studentData") || [];
        studentData.push(data);
        myCache.set("studentData", studentData);

        res.json({message: "Data submitted Successfully",success: true});
    } catch (error) {
        console.log("Error: ", error);
    }
}
