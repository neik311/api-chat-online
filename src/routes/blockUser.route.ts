import express from "express";
import blockUserController from "../controllers/blockUser.controller";
import { authUser } from "../middlewares/authToken.middlewares";

const router = express.Router();

router.get(
  "/get-block-user/:blocker/:blocked",
  blockUserController.getBlockUser
);

router.get(
  "/get-block-users/:blocker",
  blockUserController.getBlockUserByBlocker
);

router.post(
  "/create-block-user",
  authUser,
  blockUserController.createBlockUser
);

router.delete(
  "/delete-block-user/:blocker/:blocked",
  authUser,
  blockUserController.deleteBlockUser
);

export default router;
