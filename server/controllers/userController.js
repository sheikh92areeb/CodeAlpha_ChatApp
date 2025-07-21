import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';


// Controller to Signup a new User
export const signup = async (req, res) => {
    const { fullname, email, password, bio } = req.body;
    try {
        if (!fullname || !email || !password || !bio) return res.status(400).json({ success: false, message: 'Missing Details' });        
        const user = await User.findOne({ email });
        if (user) return res.status(200).json({ success: false, message: 'Account Already Exists' });
        const salt = bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ fullname, email, password: hashedPassword, bio });
        const token = generateToken(newUser._id);
        res.status(200).json({ success: true, userData: newUser, token, message: "Account Created Successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success:false, message: error.message });
    }
};