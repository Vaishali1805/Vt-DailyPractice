// Middleware to handle both file upload and string path
export const handleProfileUpload = (req, res, next) => {
    if (req.file) {
        next();
    } else if (req.body.profile && typeof req.body.profile === 'string') {
        req.profilePath = req.body.profile;
        next();
    } else {
        req.profilePath = null;
        next();
    }
};