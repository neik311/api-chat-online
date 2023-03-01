import express from "express";
import messagesController from "../controllers/messages.controller";
import { authUser } from "../middlewares/authToken.middlewares";
const router = express.Router();

router.get("/get-messages/:groupId", messagesController.getMessagesInGroup);

router.post("/create-messages", authUser, messagesController.createMessaes);

router.post(
  "/delete-messages",
  authUser,
  messagesController.deleteMessagesInGroup
);

export default router;
