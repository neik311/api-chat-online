import express from "express";
import groupController from "../controllers/group.controller";

const router = express.Router();

router.get("/get-group/:userId", groupController.getGroupByUser);

router.post("/create-group", groupController.createGroup);

router.delete("/delete-group/:id", groupController.deleteGroup);

export default router;
