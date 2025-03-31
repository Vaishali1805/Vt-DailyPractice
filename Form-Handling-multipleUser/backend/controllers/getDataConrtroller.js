import myCache from '../myCache.js'

export const getStudentData = (req,res) => {
    try {
        console.log("am in getStudentData");
        const studentData = myCache.get('studentData') || [];
        console.log("studentData:", studentData);

        res.json({studentData: studentData});
    } catch (error) {
        console.log("Error: ",error);
    }
}
