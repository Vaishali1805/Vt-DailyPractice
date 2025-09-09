// Utility to send the response
export const sendResponse = (res,message,success,status,userData = null) => {
    return res.status(status).json({ message, success, userData });
}