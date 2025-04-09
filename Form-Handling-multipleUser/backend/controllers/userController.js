import myCache from "../myCache.js";
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

export const submitFormData = (req, res) => {
    try {
        const { formData } = req.body;
        const data = JSON.parse(formData);
        if(!data){
            return res.status(400).json({message: "Data not Found",success: false});
        }

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

export const getCountries = async (req,res) => {
    try {
        const filePath = path.join(__dirname,'countries.json');
        fs.readFile(filePath, 'utf8',(err,data) => {
            if(err){
                return res.status(500).json({error: 'Failed to read data',success: false});
            }
            res.json({countries: JSON.parse(data),success: true});
        })
    } catch (error) {
        console.log("Error: ",error);
    }
}

export const getStates = async (req,res) => {
    try {
        const countryId = req.query.countryId;
        const filePath = path.join(__dirname,'states.json');
        fs.readFile(filePath,'utf-8',(err,data) => {
            if(err){
                return read.status(500).json({error:'Failes to read data',success: false});
            }
            const statesData = JSON.parse(data);
            const states = statesData.filter(state => state.countryId == countryId)
            res.json({states,success: true});
        })
    } catch (error) {
        console.log("Error: ",error);
    }
}

export const getCities = async (req,res) => {
    try {
        const countryId = req.query.countryId;
        const stateId = req.query.stateId;
        const filePath = path.join(__dirname,'cities.json');
        fs.readFile(filePath,'utf-8',(err,data) => {
            if(err){
                return read.status(500).json({error:'Failes to read data',success: false});
            }
            const citiesData = JSON.parse(data);
            const cities = citiesData.filter(city => city.stateId == stateId && city.countryId == countryId)
            res.json({cities,success: true});
        })
    } catch (error) {
        console.log("Error: ",error);
    }
}

export const editFormData = (req, res) => {
    try {
        const editedData = JSON.parse(req.body.formData);
        if(!editedData) {
            return res.status(400).json({message: "Data Not Found",success: false});
        }
        const profile = req.file ? req.file : null;

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
        myCache.set("studentData",updatedArr);
        res.json({ message: "Data edited Successfully", success: true });
    } catch (error) {
        console.error("Error editing student records:", error);
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}

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
        myCache.set('studentData', updatedArr);
        res.json({ message: "Record Deleted Successfully", success: true });
    } catch (error) {
        console.error("Error deleting student record:", error);
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}

export const deleteManyStudentRecords = (req, res) => {
    try {
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

export const getDataById = (req,res) => {
    try {
        const {studentId} = req.query;
        const studentData = myCache.get("studentData");
        if(!studentData){
            return res.status(400).json({message: "Data Not Found",success: false})
        }
        const data = studentData.filter(d => d.studentId === studentId)
        res.json({studentData: data,success: true});
    } catch (error) {
        res.status(500).json({ message: "An unexpected error occurred", success: false });
    }
}