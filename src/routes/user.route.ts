import express from "express";
import userController from "../controllers/user.controller";
import { authUser } from "../middlewares/authToken.middlewares";

const router = express.Router();

router.get("/get-user", userController.getUser);

router.post("/create-user", userController.createUser);

router.post("/login", userController.login);

router.post("/login-token", userController.loginByToken);

router.put("/update-user", authUser, userController.updateUser);

export default router;
