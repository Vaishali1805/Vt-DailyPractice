import myCache from '../myCache.js'
import path from 'path'
import fs from 'fs'
const __dirname = path.resolve();

const deleteFormData = (req, res) => {
    const { selectedFields } = req.body.obj;
    console.log("selectedFields: ", selectedFields);

    if (!selectedFields.length) {
        res.json({ message: "Nothing to delete" });
    } else {
        if (selectedFields.includes('User_Profile')) {
            console.log("Deleting user Profile");
            const file = myCache.get('profilePic');
            const filePath = path.join(__dirname, file.path);

            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    console.log("error: ", err);
                    return res.status(404).json({ error: "File Not found" });
                }
                fs.unlink(filePath, (err) => {
                    if (err) {
                        return res.status(404).json({ error: "Error deleting file" });
                    } else {
                        console.log("Profile Picture deleted successfully");
                        // res.json({ message: "Profile Picture deleted successfully"});
                    }
                });
            })
            myCache.del('profilePic');
        }

        const data = myCache.get("submittedData");
        console.log("data:", data)

        if (data) {
            const updatedObj = selectedFields.map((key) => delete data[key])
            console.log("data:", data);
        }
        myCache.set("submittedData", data);

        res.json({ message: "Keys deleted Successfully" });
    }
}

export { deleteFormData };