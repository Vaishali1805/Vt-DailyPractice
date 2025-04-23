import bcrypt from 'bcrypt';
import { readJsonFile, writeData, getHashedPassword } from "../utils/fileHelpers.js";

export const handleRegister = async (req, res) => {
    try {
        let userExists = false;
        const newUser = req.body;
        const data = await readJsonFile('registeredUsers.json');
        const dataArr = Object.values(data);
        dataArr.map(user => {
            if (user.email === newUser.email) {
                userExists = true;
            }
        })
        if (userExists) {
            return res.status(400).json({ message: 'User Already Exists', success: false });
        }
        newUser.id = Date.now() + Math.floor(Math.random() * 1000);
        newUser.password = await getHashedPassword(newUser.password);
        data[newUser.id] = newUser;
        await writeData('registeredUsers.json', data);
        return res.json({ message: 'User Registered Successfully', success: true });
    } catch (error) {
        console.log("error: ", error)
    }
}

export const handleLogin = async (req, res) => {
    try {
        let userExists = false;
        let { email, password } = req.body;
        let userId;
        const data = await readJsonFile('registeredUsers.json');
        if (!data) return res.status({ message: 'Data not found', success: false });
        const dataArr = Object.values(data);
        dataArr.map(user => {
            if (user.email === email) {
                userId = user.id;
                userExists = true;
            }
        })
        if (!userExists) {
            return res.status(400).json({ message: 'User not Exist Signup first', success: false });
        }
        bcrypt.compare(password, data[userId].password, function (err, result) {
            if (err) throw err;
            if (result === true) {
                return res.json({ message: 'Login Successfull', success: true });
            } else {
                return res.json({ message: 'Incorrect Password', success: false });
            }
        });
    } catch (error) {
        console.log("error: ", error)
    }
}