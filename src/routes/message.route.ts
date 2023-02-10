import express from "express";
import messagesController from "../controllers/messages.controller";
import { authUser } from "../middlewares/authToken.middlewares";
const router = express.Router();

router.post("/create-messages", authUser, messagesController.createMessaes);

router.get("/get-messages/:groupId", messagesController.getMessagesInGroup);

export default router;
