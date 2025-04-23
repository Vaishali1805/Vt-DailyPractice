import bcrypt from 'bcrypt';
import { readJsonFile, writeData, getHashedPassword } from "../utils/fileHelpers.js";

export const handleRegister = async (req, res) => {
    try {
        const newUser = req.body;
        const data = await readJsonFile('registeredUsers.json');
        // const dataArr = Object.values(data);
        // dataArr.map(user => {
        //     if (user.email === newUser.email) {
        //         userExists = true;
        //     }
        // })       --before and after
        const userExists = Object.values(data).some(user => user.email === newUser.email);
        if (userExists) {
            return res.status(400).json({ message: 'User Already Exists', success: false });
        }
        newUser.id = Date.now() + Math.floor(Math.random() * 1000);
        newUser.password = await getHashedPassword(newUser.password);
        data[newUser.id] = newUser;
        await writeData('registeredUsers.json', data);
        res.json({ message: 'User Registered Successfully', success: true });
    } catch (error) {
        console.log("error: ", error)
        res.status(500).json({ message: 'Server Error', success: false });
    }
}

export const handleLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        const data = await readJsonFile('registeredUsers.json');
        if (!data) return res.status({ message: 'Data not found', success: false });

        // const dataArr = Object.values(data);
        // dataArr.map(user => {
        //     if (user.email === email) {
        //         userId = user.id;
        //         userExists = true;
        //     }
        // })       --before and after
        const user = Object.values(data).find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ message: 'User not Exist Signup first', success: false });
        }
        const match = await bcrypt.compare(password, user.password);
        res.json({
            message: match ? 'Login Successfull' : 'Incorrect Password',
            success: match
        });
    } catch (error) {
        console.log("error: ", error)
    }
}