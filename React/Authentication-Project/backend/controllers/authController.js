import bcrypt from 'bcrypt';
import Cookies from 'js-cookie';
import { createToken } from "../utils/helper.js";
import { readJsonFile, writeData, getHashedPassword } from "../utils/fileHelpers.js";

export const handleRegister = async (req, res) => {
    try {
        const { newUser } = req.body;
        console.log("newUser: ", newUser);
        
        const data = await readJsonFile('registeredUsers.json');
        const userExists = Object.values(data).some(user => user.email === newUser.email);
        if (userExists) {
            return res.json({ message: 'User Already Exists', success: false });
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
        console.log("🚀 ~ handleLogin ~ email:", email, "password: ", password);
        const data = await readJsonFile('registeredUsers.json');
        if (!data) return res.json({ message: 'Data not found', success: false });

        const user = Object.values(data).find(user => user.email === email);
        if (!user) {
            return res.json({ message: 'User not Exist Signup first', success: false });
        }
        const match = await bcrypt.compare(password, user.password);
        let token;
        if (match) {
            const payload = {
                id: user.id
            }
            token = await createToken(payload);
            console.log("token: ", token)
            // Cookies.set('token',token, {
            //     secure: true,
            //     httpOnly: true,
            //     maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
            // })
        }
        res.json({
            message: match ? 'Login Successfull' : 'Incorrect Password',
            success: match, name: user.name, id: user.id, email: user.email, role: user.role, token: token
        });
    } catch (error) {
        console.log("error: ", error)
        res.status(500).json({ message: 'Server Error', success: false });
    }
}

export const getUserData = async (req, res) => {
    try {
        const data = await readJsonFile('registeredUsers.json');
        if(!data)
            res.json({message: "Data not fetched properly",success: false});
        const userData = Object.values(data).map(({ name, email, id, role }) => ({ name, email, id, role }));
        res.json({ userData, success: true });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
};

export const handleDelete = async (req, res) => {
    try {
        const { userIds } = req.body;
        console.log("🚀 ~ handleDelete ~ userIds:", userIds)
        if (userIds.length === 0) {
            return res.json({ message: "No IDs provided for deletion", success: false });
        }
        const userData = await readJsonFile('registeredUsers.json');
        userIds.map((id) => delete userData[id])
        await writeData('registeredUsers.json', userData);
        res.json({ message: "Rows deleted successfully", success: true });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
}

export const handleEdit = async (req, res) => {
    try {
        const allUserData = await readJsonFile('registeredUsers.json');
        console.log("req.body: ", req.body);
        const { id, name, email, role } = req.body;

        //check email must be unique
        const isEmailTaken = Object.keys(allUserData)
            .filter(userId => userId !== id) // Exclude the current user
            .some(userId => allUserData[userId].email === email);
        if (isEmailTaken)
            return res.json({ success: false, message: "Email is already in use by another user" });
        allUserData[id].name = name;
        allUserData[id].email = email;
        allUserData[id].role = role;
        await writeData('registeredUsers.json', allUserData);
        return res.json({ success: true, message: "Data updated successfully" });
    } catch (error) {
        res.json({ message: 'Server Error', success: false });
    }
}
