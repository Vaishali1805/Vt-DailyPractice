import jwt from 'jsonwebtoken';
import { tokenVerify } from '../utils/helper.js';

// Middleware to verify JWT token
export const verifyToken = async (req, res, next) => {
    // Get token from cookie
    // const token = req.cookies.token;

    const authHeader = req.headers.authorization;
    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        // token = authHeader.split(" ")[1];
        token = authHeader.split(" ")[1].replace(/^"|"$/g, ''); // remove extra quotes
    }
    if (!token) {
        return res.status(401).json({
            message: 'Access denied. No token provided.',
            success: false,
        });
    }
    try {
        const decoded = await tokenVerify(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Token verification error:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({
                message: 'Token has expired. Please log in again.',
                success: false,
            });
        }
        return res.status(403).json({
            message: 'Invalid token.',
            success: false,
        });
    }
}