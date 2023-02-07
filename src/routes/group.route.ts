import express from "express";
import groupController from "../controllers/group.controller";

const router = express.Router();

router.get("/get-group/:sender/:receive", groupController.getGroup);

router.get("/get-groups/:userId", groupController.getGroupByUser);

router.post("/create-group", groupController.createGroup);

router.put("/delete-group", groupController.deleteGroup);

export default router;
