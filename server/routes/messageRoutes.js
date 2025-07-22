import express from "express";
import { protectRoute } from "../middlewares/auth.js";
import { getMessages, getUsersForSidebar, markMessgaeAsSeen, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get('/users', protectRoute, getUsersForSidebar);
messageRouter.get('/:id', protectRoute, getMessages);
messageRouter.put('/mark/:id', protectRoute, markMessgaeAsSeen);
messageRouter.post('/send/:id', protectRoute, sendMessage);

export default messageRouter;