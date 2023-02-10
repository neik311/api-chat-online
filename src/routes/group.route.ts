import express from "express";
import groupController from "../controllers/group.controller";
import { authUser } from "../middlewares/authToken.middlewares";

const router = express.Router();

router.get("/get-group/:sender/:receive", groupController.getGroup);

router.get("/get-groups/:userId", groupController.getGroupByUser);

router.post("/create-group", authUser, groupController.createGroup);

router.put("/delete-group", authUser, groupController.deleteGroup);

export default router;
