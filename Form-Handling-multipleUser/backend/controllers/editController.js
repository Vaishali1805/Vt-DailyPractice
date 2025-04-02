import myCache from "../myCache.js";

export const editFormData = (req, res) => {
    try {
        const editedData = JSON.parse(req.body.formData);
        const profile = req.file ? req.file : null;
        console.log("editedData:", editedData);
        console.log("profile:", profile);

        const studentsData = myCache.get("studentData") || [];
        console.log("studentsData: ", studentsData);

        if (profile) {
            editedData.profile = profile;
        } else {
            studentsData.map((data) => {
                if (data.studentId === editedData.studentId) {
                    editedData.profile = data.profile;
                }
            })
        }

        const updatedArr = studentsData.filter((data) => data.studentId != editedData.studentId);
        updatedArr.push(editedData);
        console.log("updatedArr: ", updatedArr);

        myCache.set("studentData",updatedArr);

        res.json({ message: "Data edited Successfully", success: true });
    } catch (error) {
        console.error("Error editing student records:", error);
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}
