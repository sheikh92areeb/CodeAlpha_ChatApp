import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";

// Get all Users except the logged in user
export const getUsersForSidebar = async (req, res) => {
    try {
        const userID = req.user._id;
        const filterUsers = await User.find({ _id: { $ne: userID } }).select("-password");

        // Count number of messages not seen
        const unseenMessages = {};
        const promises = filterUsers.map(async (user) => {
            const messages = await Message.find({ senderId: user._id, receiverId: userID, seen: false });
            if (messages.length > 0) unseenMessages[user._id] = messages.length;

        });
        await Promise.all(promises);
        res.status(200).json({ success: true, users: filterUsers, unseenMessages });
    } catch (error) {
        console.log(error.messages);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all Messages for Selected User
export const getMessages = async (req, res) => {
    try {
        const { id: selectedUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or : [
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        });
        await Message.updateMany({ senderId: selectedUserId, receiverId: myId }, {seen: true});
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.log(error.messages);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to Mark Message as seen using message id
export const markMessgaeAsSeen = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, { seen: true });
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error.messages);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Send Message to Selected User
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const receiverId = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        // Emit the new message to receiver's socket 
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessgae", newMessage);
        }

        res.status(200).json({ success: true, newMessage });
    } catch (error) {
        console.log(error.messages);
        res.status(500).json({ success: false, message: error.message });
    }
};