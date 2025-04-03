import myCache from '../myCache.js'
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

export const getStudentData = (req,res) => {
    try {
        const studentData = myCache.get('studentData') || [];
        console.log("studentData:", studentData);

        res.json({studentData: studentData});
    } catch (error) {
        console.log("Error: ",error);
    }
}

export const getCountries = async (req,res) => {
    try {
        const filePath = path.join(__dirname,'countries.json');
        fs.readFile(filePath, 'utf8',(err,data) => {
            if(err){
                return res.status(500).json({error: 'Failed to read data'});
            }
            res.json(JSON.parse(data));
        })
        console.log("data",data);
    } catch (error) {
        console.log("Error: ",error);
    }
}
