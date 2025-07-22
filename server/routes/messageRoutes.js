import express from "express";
import { protectRoute } from "../middlewares/auth.js";
import { getMessages, getUsersForSidebar, markMessgaeAsSeen } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get('/users', protectRoute, getUsersForSidebar);
messageRouter.get('/:id', protectRoute, getMessages);
messageRouter.put('/mark/:id', protectRoute, markMessgaeAsSeen);

export default messageRouter;