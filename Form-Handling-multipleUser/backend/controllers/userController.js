import myCache from "../myCache.js";
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

export const submitFormData = (req, res) => {
    try {
        console.log("submitFormData");
        const { formData } = req.body;
        const data = JSON.parse(formData);
        if(!data){
            return res.status(400).json({message: "Data not Found",success: false});
        }
        data.profile = req.file ? req.file : null;
        data.id = Math.floor(Math.random() * Date.now())
        const studentData = myCache.get("studentData") || [];
        studentData.push(data);
        myCache.set("studentData", studentData);
        res.json({message: "Data submitted Successfully",success: true});
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const editFormData = (req, res) => {
    try {
        const {id} = req.query;
        // const regularObj = Object.fromEntries(Object.entries(req.body));
        const file = req.file;
        const editedData = req.body;
        if(!editedData) {
            return res.status(400).json({message: "Data Not Found",success: false});
        }
        const studentsData = myCache.get("studentData") || [];
        let studentIndex = studentsData.findIndex(data => data.id == id);
        if (studentIndex === -1) {
            return res.status(404).json({ message: "Student not found", success: false });
        }
        
        // Update the student fields with the editedData - spread operator is used to merge both the arrays
        studentsData[studentIndex] = {
            ...studentsData[studentIndex],
            ...editedData
        };
        studentsData[studentIndex].profile = file ? file : studentsData[studentIndex].profile;
        console.log("🚀 ~ editFormData ~ studentsData[studentIndex]:", studentsData[studentIndex])
        myCache.set("studentData", studentsData);
        res.json({ message: "Data edited Successfully", success: true });
    } catch (error) {
        console.error("Error editing student records:", error);
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}

export const getStudentData = async (req,res) => {
    try {
        const studentData = myCache.get('studentData') || [];
        console.log("studentData:", studentData);

        const [countries, states, cities] = await Promise.all([
            readJsonFile('countries.json'),
            readJsonFile('states.json'),
            readJsonFile('cities.json')
        ]);

        //GET countries,states and cities and also send it in the response
        res.json({studentData,countries,states,cities,success: true});
    } catch (error) {
        console.log("Error: ",error);
    }
}

const readJsonFile = async (filename) => {
    const filePath = path.join(__dirname, filename);
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error(`Failed to read ${filename}: ${err.message}`);
    }
};

export const getLocationData = async (req,res) => {
    try {
        const { type, countryId, stateId } = req.query;
        let data = [];
        let filtered = [];

        switch (type) {
            case 'countries':
                data = await readJsonFile('countries.json');
                return res.json({ countries: data, success: true });

            case 'states':
                if (!countryId) {
                    return res.status(400).json({ error: 'countryId is required', success: false });
                }
                data = await readJsonFile('states.json');
                filtered = data.filter(state => state.countryId == countryId);
                return res.json({ states: filtered, success: true });

            case 'cities':
                if (!countryId || !stateId) {
                    return res.status(400).json({ error: 'countryId and stateId are required', success: false });
                }
                data = await readJsonFile('cities.json');
                filtered = data.filter(city => city.countryId == countryId && city.stateId == stateId);
                return res.json({ cities: filtered, success: true });

            default:
                return res.status(400).json({ error: 'Invalid type parameter', success: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
}

export const deleteStudentRecords = (req, res) => {
    try {
        const { studentIds } = req.body;
        if (studentIds.length === 0) {
            return res.status(400).json({ message: "No IDs provided for deletion", success: false });
        }

        const studentData = myCache.get('studentData') || [];
        const filteredStudentData = studentData.filter(student => !studentIds.includes(student.id));
        if (studentData.length === filteredStudentData.length) {
            return res.status(404).json({ message: "No matching student records found to delete", success: false });
        }
        //also deleted the profile from the uploads folder
        myCache.set("studentData", filteredStudentData);
        res.json({ message: "Rows deleted successfully", success: true });
    } catch (error) {
        console.error("Error deleting student records:", error);
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}

export const getDataById = (req,res) => {
    try {
        const {id} = req.query;
        const studentData = myCache.get("studentData") || [];
        if(!studentData){
            return res.status(400).json({message: "Data Not Found",success: false})
        }
        const data = studentData.filter(d => d.id == id)
        res.json({studentData: data,success: true});
    } catch (error) {
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}