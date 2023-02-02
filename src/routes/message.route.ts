import express from "express";
import messagesController from "../controllers/messages.controller";

const router = express.Router();

router.post("/create-messages", messagesController.createMessaes);
router.get("/get-messages/:groupId", messagesController.getMessagesInGroup);

export default router;
