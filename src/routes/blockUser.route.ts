import express from "express";
import blockUserController from "../controllers/blockUser.controller";

const router = express.Router();

// router.get("/get-block-user", blockUserController.getBlockUser);

router.get(
  "/get-block-user/:blocker",
  blockUserController.getBlockUserByBlocker
);

router.post("/create-block-user", blockUserController.createBlockUser);

router.delete("/delete-block-user", blockUserController.deleteBlockUser);

export default router;
