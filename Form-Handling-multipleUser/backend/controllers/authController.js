import bcrypt from 'bcrypt';
import { readJsonFile, writeData, getHashedPassword } from "../utils/fileHelpers.js";

export const handleRegister = async (req, res) => {
    try {
        const newUser = req.body;
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
        res.json({
            message: match ? 'Login Successfull' : 'Incorrect Password',
            success: match, name: user.name, id: user.id
        });
    } catch (error) {
        console.log("error: ", error)
        res.status(500).json({ message: 'Server Error', success: false });
    }
}

export const getUserData = async (req, res) => {
    const data = await readJsonFile('registeredUsers.json');
    const userData = Object.values(data).map(({ name, email, id, role }) => ({ name, email, id, role }));
    res.json(userData);
};

export const handleDelete = async (req, res) => {
    const { userIds } = req.body;
    console.log("🚀 ~ handleDelete ~ userIds:", userIds)
    if (userIds.length === 0) {
        return res.status(400).json({ message: "No IDs provided for deletion", success: false });
    }
    const userData = await readJsonFile('registeredUsers.json');
    userIds.map((id) => delete userData[id])
    await writeData('registeredUsers.json', userData);
    res.json({ message: "Rows deleted successfully", success: true });
}

export const handleWelcome = async (req, res) => {
    console.log("Am in handleWelcome");
}

export const handleEdit = async (req, res) => {
    try {
        const allUserData = await readJsonFile('registeredUsers.json');
        console.log("req.body: ",req.body);
        const { id,name,email,role } = req.body;
        //check email must be unique
        const isEmailTaken = Object.keys(allUserData)
            .filter(userId => userId !== id) // Exclude the current user
            .some(userId => allUserData[userId].email === userData.email);

        if (isEmailTaken)
            return res.status(400).json({success: false,message: "Email is already in use by another user"});

        allUserData[id].name = name;
        allUserData[id].email = email;
        allUserData[id].role = role;
        await writeData('registeredUsers.json', allUserData);
        console.log("user data: ",allUserData[id]);
        return res.json({userData: allUserData[id],success: true,message: "Data updated successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', success: false });
    }
}