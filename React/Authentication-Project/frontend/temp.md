export const handleImagesUpload = async (req, res) => {
    if (!req.files) return sendResponse(res, "No files Provided", false, 400);

    const { userId } = req.body;
    const allUserData = await readJsonFile('registeredUsers.json');

    // If user does not exist, send error
    if (!allUserData[userId]) {
        return sendResponse(res, "User not found", false, 404);
    }

    const pathArray = req.files.map(file => file.path);

    // Ensure uploadedImages key exists
    if (!Array.isArray(allUserData[userId].uploadedImages)) {
        allUserData[userId].uploadedImages = [];
    }

    // Add new images to existing uploadedImages
    allUserData[userId].uploadedImages.push(...pathArray);

    // Save back to file
    await writeData('registeredUsers.json', allUserData);

    return sendResponse(res, "Images uploaded successfully", true, 200);
};
