import bcrypt from 'bcrypt';
import Cookies from 'js-cookie';
import { createToken, sendResponse, validateData } from "../utils/helper.js";
import { readJsonFile, writeData, getHashedPassword } from "../utils/fileHelpers.js";

//function to register the new user
export const handleRegister = async (req, res) => {
    try {
        const { newUser } = req.body;
        if (!newUser) return sendResponse(res, "Data Not Found", false, 400)

        console.log("new user: ", newUser)
        const result = validateData(newUser);
        if (!result) return sendResponse(res, "Validation failed", false, 400);

        const data = await readJsonFile('registeredUsers.json');
        const userExists = Object.values(data).some(user => user.email === newUser.email);
        if (userExists) {
            return sendResponse(res, "User Already Exists", false, 409);
        }

        //generate a unique id for every user
        newUser.id = Date.now() + Math.floor(Math.random() * 1000);

        //convert password into hashed password
        const hashedresult = await getHashedPassword(newUser.password);
        if (!hashedresult) return sendResponse(res, "Password hashing failed. Please try again.", false, 500);
        else newUser.password = hashedresult;

        data[newUser.id] = newUser;
        await writeData('registeredUsers.json', data);
        return sendResponse(res, "User Registered Successfully", true, 200);
    } catch (error) {
        // console.log("signup error: ", error)
        sendResponse(res, "Server Error", false, 500);
    }
}

export const handleLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) return sendResponse(res, "Data Not Found", false, 400);

        const result = validateData({ email, password });
        if (!result) return sendResponse(res, "Validation failed", false, 400);

        const data = await readJsonFile('registeredUsers.json');
        const user = Object.values(data).find(user => user.email === email);
        if (!user) return sendResponse(res, "User not Exist Signup first", false, 400);

        const match = await bcrypt.compare(password, user.password);
        let token;
        if (match) {
            const payload = {
                id: user.id
            }
            token = await createToken(payload);
            // Cookies.set('token',token, {
            //     secure: true,
            //     httpOnly: true,
            //     maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
            // })
            const { password, ...data } = user;
            return sendResponse(res, "Login Successfull", true, 200, data, token);
        }
        sendResponse(res, "Incorrect Password", false, 400);
    } catch (error) {
        // console.log("login error: ", error)
        sendResponse(res, "Server Error", false, 500);
    }
}

export const getUserData = async (req, res) => {
    try {
        const data = await readJsonFile('registeredUsers.json');
        const userData = Object.values(data).map(({ name, email, id, role }) => ({ name, email, id, role }));
        sendResponse(res, "Data fetched properly", true, 200, userData);
    } catch (error) {
        console.log("Read file error: ", error);
        sendResponse(res, "Failed to load user data", false, 500);
    }
};

export const handleDelete = async (req, res) => {
    try {
        const { userIds } = req.body;
        if (userIds.length === 0) {
            return sendResponse(res, "No IDs provided for deletion", false, 400);
        }
        const userData = await readJsonFile('registeredUsers.json');
        userIds.map((id) => delete userData[id])
        await writeData('registeredUsers.json', userData);
        sendResponse(res, "Data deleted successfully", true, 200);
    } catch (error) {
        console.log("Delete data error: ", error);
        sendResponse(res, "Server Error", false, 500);
    }
}

export const handleEdit = async (req, res) => {
    try {
        const allUserData = await readJsonFile('registeredUsers.json');
        const { userId, name, email, role } = req.body;
        if (!userId || !name || !email || !role)
            sendResponse(res, "Something went wrong", false, 400);

        const result = validateData({ name, email, role });
        if (!result) return sendResponse(res, "Validation failed", false, 400);

        //check user exist or not
        const userExist = Object.keys(allUserData).some(id => id === String(userId))
        if (!userExist) return sendResponse(res, "User does not exist", false, 400);

        //check email must be unique
        const isEmailTaken = Object.keys(allUserData)
            .filter(id => id !== String(userId)) // Exclude the current user
            .some(id => allUserData[id].email === email);
        if (isEmailTaken) return sendResponse(res, "Email is already in use by another user", false, 400);

        // Update user data
        allUserData[userId].name = name;
        allUserData[userId].email = email;
        allUserData[userId].role = role;

        // Save image if provided
        if(req.file) {
            allUserData[userId].profilePath = req.file.path;
        }

        const { id, password, ...userData } = allUserData[userId]; 
        await writeData('registeredUsers.json', allUserData);
        sendResponse(res, "Data updated successfully", true, 200, userData);
    } catch (error) {
        console.log("Edit data error: ", error)
        sendResponse(res, "Server Error", false, 500);
    }
}