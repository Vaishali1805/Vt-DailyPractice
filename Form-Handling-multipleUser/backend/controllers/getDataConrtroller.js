import myCache from '../myCache.js'
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

export const getStudentData = async (req,res) => {
    try {
        const studentData = myCache.get('studentData') || [];
        console.log("studentData:", studentData);

        let countries;
        let states;
        let cities;

        const countryFilePath = path.join(__dirname,'countries.json');
        fs.readFile(countryFilePath, 'utf8',(err,data) => {
            if(err){
                return res.status(500).json({error: 'Failed to read data'});
            }
            countries = JSON.parse(data);
        })
        
        const stateFilePath = path.join(__dirname,'states.json');
        fs.readFile(stateFilePath, 'utf8',(err,data) => {
            if(err){
                return res.status(500).json({error: 'Failed to read data'});
            }
            states = JSON.parse(data);
        })

        const cityFilePath = path.join(__dirname,'cities.json');
        fs.readFile(cityFilePath, 'utf8',(err,data) => {
            if(err){
                return res.status(500).json({error: 'Failed to read data'});
            }
            cities = JSON.parse(data);
        })

        //GET countries,states and cities and also send it in the response
        res.json({studentData,countries,states,cities});
    } catch (error) {
        console.log("Error: ",error);
    }
}

function readJSONFile(fileName) {
    const filePath = path.join(__dirname,fileName);
        fs.readFile(filePath, 'utf8',(err,data) => {
            if(err){
                return false;
            }
            console.log("data: ",JSON.parse(data))
            const fileData = JSON.parse(data);
            return fileData;
        })
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
                return read.status(500).json({error:'Failes to read data'});
            }
            const statesData = JSON.parse(data);
            // console.log("statesData: ",statesData)
            const states = statesData.filter(state => state.countryId == countryId)
            // console.log("🚀 ~ fs.readFile ~ states:", states)
            res.json(states);
        })
    } catch (error) {
        console.log("Error: ",error);
    }
}

export const getCities = async (req,res) => {
    try {
        const countryId = req.query.countryId;
        console.log("🚀 ~ getCities ~ countryId:", countryId)
        const stateId = req.query.stateId;
        console.log("🚀 ~ getCities ~ stateId:", stateId)
        const filePath = path.join(__dirname,'cities.json');
        fs.readFile(filePath,'utf-8',(err,data) => {
            if(err){
                return read.status(500).json({error:'Failes to read data'});
            }
            const citiesData = JSON.parse(data);
            // console.log("citiesData: ",citiesData)
            const cities = citiesData.filter(city => city.stateId == stateId && city.countryId == countryId)
            // console.log("🚀 ~ fs.readFile ~ cities:", cities)
            res.json(cities);
        })
    } catch (error) {
        console.log("Error: ",error);
    }
}