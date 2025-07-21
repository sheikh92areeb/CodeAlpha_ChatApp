import jwt from 'jsonwebtoken';

// Function to Generate Token for user
export const generateToken = (userID) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET);
    return token;
};