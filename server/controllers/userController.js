import cloudinary from "../lib/cloudinary.js";
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

// Controller to Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "Invalid Credentials" });
        const token = generateToken(userData._id);
        res.status(200).json({ success: true, userData, token, message: "Login Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success:false, message: error.message });
    }
};

// Controller to check if user is Authentication
export const checkAuth = (req, res) => {
    res.status(200).json({ success: true, user: req.user });
};

// Controller to update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullname } = req.body;
        const userId = req.user._id;

        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullname}, {new: true});
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullname }, {new:true})''
        }

        res.status(200).json({ success:true, user: updatedUser });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};