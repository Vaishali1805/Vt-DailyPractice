import fs from 'fs';
import path from 'path';
import { readJsonFile, writeData } from "../utils/fileHelpers.js";
import { sendResponse, validateData } from "../utils/helper.js";

export const getUserData = async (req, res) => {
    try {
        const data = await readJsonFile('registeredUsers.json');
        // const userData = Object.values(data).map(({ name, email, id, role, profilePath, uploadedImages}) => ({ name, email, id, role, profilePath, uploadedImages }));
        const userData = Object.values(data).map((user) => {
            const { password, ...data } = user;
            return data;
        })
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
        console.log("req.body: ", req.body);
        const { userId, name, email, role } = req.body || {};
        if (!userId || !name || !email || !role)
            return sendResponse(res, "Something went wrong", false, 400);

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
        if (req.file) {
            allUserData[userId].profilePath = req.file.path;
        }
        // ----pending if user change the profile picture then first delete the previous from the uploads folder

        const { id, password, ...userData } = allUserData[userId];
        await writeData('registeredUsers.json', allUserData);
        return sendResponse(res, "Data updated successfully", true, 200, userData);
    } catch (error) {
        console.log("Edit data error: ", error)
        sendResponse(res, "Server Error", false, 500);
    }
}

export const handleImagesUpload = async (req, res) => {
    if (!req.files) return sendResponse(res, "No files Provided", false, 400);
    const { userId } = req.body;
    const allUserData = await readJsonFile('registeredUsers.json')

    // If user does not exist, send error
    if (!userId || !allUserData[userId]) {
        return sendResponse(res, "User not found", false, 404);
    }

    if (!Array.isArray(allUserData[userId].uploadedImages)) {
        allUserData[userId].uploadedImages = [];
    }
    const pathArray = req.files.map(file => file.path);
    allUserData[userId].uploadedImages.push(...pathArray);

    await writeData('registeredUsers.json', allUserData);
    sendResponse(res, "Images Uploaded Successfully", true, 200);
}

export const handleUploadVideo = async (req, res) => {
    const { fileName, chunkIndex, totalChunks, userId } = req.body;
    const chunk = req.file || (req.files && req.files.chunk?.[0]);

    if (!chunk || !fileName || !userId) {
        return sendResponse(res, "Missing data", false, 400);
    }

    const tempDir = path.join('uploads', 'chunks', fileName);
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const chunkPath = path.join(tempDir, `${chunkIndex}`);
    fs.writeFileSync(chunkPath, chunk.buffer || fs.readFileSync(chunk.path));

    const uploadedChunks = fs.readdirSync(tempDir);
    if (uploadedChunks.length == totalChunks) {
        const videosDir = path.join('uploads', 'videos');
        if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });
        const finalPath = path.join(videosDir, fileName);
        const writeStream = fs.createWriteStream(finalPath);

        for (let i = 0; i < totalChunks; i++) {
            const chunkData = fs.readFileSync(path.join(tempDir, `${i}`));
            writeStream.write(chunkData);
        }

        writeStream.end();

        // Update user's uploadedVideos in JSON
        const allUserData = await readJsonFile("registeredUsers.json");
        allUserData[userId].uploadedVideos = allUserData[userId].uploadedVideos || [];
        allUserData[userId].uploadedVideos.push(finalPath);
        await writeData("registeredUsers.json", allUserData);

        // Clean up
        fs.rmSync(tempDir, { recursive: true });

        return sendResponse(res, "Video uploaded successfully", true, 200);
    }

    return sendResponse(res, `Chunk ${chunkIndex} uploaded`, true, 200);
};
