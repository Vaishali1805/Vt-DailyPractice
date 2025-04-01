import myCache from "../myCache.js";

export const deleteStudentRecord = (req, res) => {
    try {
        const { studentId } = req.body;
        const id = JSON.parse(studentId);
        let studentData = myCache.get("studentData");
        if (!studentData) {
            return res.status(400).json({ message: "Student Not found", success: false });
        }

        const updatedArr = studentData.map((obj) => {
            if (obj.studentId != id) {
                return obj;
            }
        }).filter(Boolean);
        console.log("updatedArr: ", updatedArr);
        myCache.set('studentData', updatedArr);
        res.json({ message: "Record Deleted Successfully", success: true });
    } catch (error) {
        console.error("Error deleting student record:", error);
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}

export const deleteManyStudentRecords = (req, res) => {
    try {
        console.log("am in deleteManyStudentRecords");

        const { selectedIds } = req.body.obj;
        console.log("selectedIds: ", selectedIds);
        if (selectedIds.length === 0) {
            return res.status(400).json({ message: "No IDs provided for deletion", success: false });
        }

        const studentData = myCache.get('studentData') || [];
        console.log("studentData: ", studentData);

        const filteredStudentData = studentData.filter(student => !selectedIds.includes(student.studentId));
        console.log("🚀 ~ deleteManyStudentRecords ~ filteredStudentData:", filteredStudentData)

        if (studentData.length === filteredStudentData.length) {
            return res.status(404).json({ message: "No matching student records found to delete", success: false });
        }

        myCache.set("studentData", filteredStudentData);
        res.json({ message: "Rows deleted successfully", success: true });
    } catch (error) {
        console.error("Error deleting student records:", error);
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}