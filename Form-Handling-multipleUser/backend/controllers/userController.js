import myCache from "../myCache.js";
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

export const submitFormData = async (req, res) => {
    try {
        const { formData } = req.body;
        const data = JSON.parse(formData);
        if (!data) {
            return res.status(400).json({ message: "Data not Found", success: false });
        }
        data.profile = req.file ? req.file : null;
        data.id = Date.now() + Math.floor(Math.random() * 1000);
        console.log("🚀 ~ submitFormData ~ data:", data)
        // const studentData = getDataFromCache();
        const studentData = await readJsonFile('userData.json');
        studentData.push(data);
        writeData('userData.json',studentData);
        // await fs.writeFile('userData.json',JSON.stringify(studentData,null,2),(err) => console.log("Failed to write data in a file: ",err));
        // setDataInCache(studentData);
        res.json({ message: "Data submitted Successfully", success: true });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const editFormData = async (req, res) => {
    try {
        const { id } = req.query;
        const file = req.file;
        const editedData = req.body;
        if (!id || !editedData) {
            return res.status(400).json({ message: "Data Not Found", success: false });
        }
        // const studentData = getDataFromCache();
        const studentsData = await readJsonFile('userData.json');
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
        await writeData('userData.json',studentsData);
        // await fs.writeFile('userData.json',JSON.stringify(studentsData,null,2),(err) => console.log("Failed to write data in a file: ",err));
        // setDataInCache(studentsData);
        res.json({ message: "Data edited Successfully", success: true });
    } catch (error) {
        console.error("Error editing student records:", error);
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}

export const getStudentData = async (req, res) => {
    try {
        // const studentData = getDataFromCache();
        const studentData = await readJsonFile('userData.json');
        console.log("studentData:", studentData);

        const [countries, states, cities] = await Promise.all([
            readJsonFile('countries.json'),
            readJsonFile('states.json'),
            readJsonFile('cities.json')
        ]);
        res.json({ studentData, countries, states, cities, success: true });
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getLocationData = async (req, res) => {
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

export const deleteStudentRecords = async (req, res) => {
    try {
        const { studentIds } = req.body;
        if (studentIds.length === 0) {
            return res.status(400).json({ message: "No IDs provided for deletion", success: false });
        }

        // const studentData = getDataFromCache();
        const studentData = await readJsonFile('userData.json');
        const filteredStudentData = studentData.filter(student => !studentIds.includes(student.id));
        if (studentData.length === filteredStudentData.length) {
            return res.status(404).json({ message: "No matching student records found to delete", success: false });
        }
        //also deleted the profile from the uploads folder ---- pending
        await writeData('userData.json',filteredStudentData);
        // await fs.writeFile('userData.json',JSON.stringify(filteredStudentData,null,2),(err) => console.log("Failed to write data in a file: ",err));
        // setDataInCache(filteredStudentData);
        res.json({ message: "Rows deleted successfully", success: true });
    } catch (error) {
        console.error("Error deleting student records:", error);
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}

export const getDataById = async (req, res) => {
    try {
        const { id } = req.query;
        // const studentData = getDataFromCache();
        const studentData = await readJsonFile('userData.json');
        if (!studentData) {
            return res.status(400).json({ message: "Data Not Found", success: false })
        }
        const data = studentData.filter(d => d.id == id)
        res.json({ studentData: data, success: true });
    } catch (error) {
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}

const readJsonFile = async (filename) => {
    const filePath = path.join(__dirname, filename);
    try {
        if (fs.existsSync(filePath)) {
            const data = await fs.promises.readFile(filePath, 'utf8');
            if(data.trim() === '') return [];
            return JSON.parse(data);
        }
    } catch (err) {
        throw new Error(`Failed to read ${filename}: ${err.message}`);
    }
};

const writeData = async (filename,data) => {
    const filePath = path.join(__dirname, filename);
    try {
        if (fs.existsSync(filePath)) {
            fs.writeFile(filename,JSON.stringify(data,null,2),(err) => {
                console.log("Error: ",err);
            })
        }
    } catch (error) {
        throw new Error(`Failed to write ${filename}: ${err.message}`);
    }
}

const getDataFromCache = () => {
    const studentData = myCache.get("studentData") || [];
    return studentData;
}

const setDataInCache = (data) => {
    myCache.set("studentData", data);
}