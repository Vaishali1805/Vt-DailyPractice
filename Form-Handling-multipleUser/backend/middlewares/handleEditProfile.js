//Middleware to handle both if file is upload or not
export const handleProfileUpload = (req, res, next) => {
    if (req.file) {
        console.log('File uploaded:', req.file.originalname);
        next();
    } else {
        console.log('No file uploaded, proceeding without file.');
        next();
    }
}