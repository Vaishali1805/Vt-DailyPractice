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
        console.log("req.body: ",req.body)
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