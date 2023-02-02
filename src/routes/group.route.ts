import express from "express";
import groupController from "../controllers/group.controller";

const router = express.Router();

router.post("/create-group", groupController.createGroup);
router.get("/get-group/:userId", groupController.getGroupByUser);

export default router;
