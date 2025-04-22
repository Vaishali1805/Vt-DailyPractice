import { readJsonFile,writeData } from "../utils/fileHelpers.js";

export const handleRegister = async (req,res) => {
    const newUser = req.body;
    const data = await readJsonFile('registeredUsers.json');
    const dataArr  = Object.values(data);
    dataArr.map(user => {
        if(user.email === newUser.email){
            return res.status(400).json({message:'User Already Exist',success:false});
        }
    })
    newUser.id = Date.now() + Math.floor(Math.random() * 1000);
    data[newUser.id] = newUser;
    await writeData('registeredUsers.json',data);
    return res.json({message:'User Registered Successfully',success: true});
}