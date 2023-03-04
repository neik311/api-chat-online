"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authToken_middlewares_1 = require("../middlewares/authToken.middlewares");
const router = express_1.default.Router();
router.get("/verify/:email/:uniqueString", user_controller_1.default.verifyEmail);
router.get("/verify-password/:email/:uniqueString", user_controller_1.default.verifyChangePassword);
router.get("/verified", user_controller_1.default.verified);
router.get("/get-all-user", user_controller_1.default.getAllUser);
router.get("/get-user", user_controller_1.default.getUser);
router.post("/create-user", user_controller_1.default.createUser);
router.post("/forgot-password", user_controller_1.default.createForgotPassword);
router.post("/login", user_controller_1.default.login);
router.post("/login-token", user_controller_1.default.loginByToken);
router.put("/update-user", authToken_middlewares_1.authUser, user_controller_1.default.updateUser);
router.post("/lock-user", authToken_middlewares_1.authUser, user_controller_1.default.lockUser);
router.post("/send-email", user_controller_1.default.sendMail);
exports.default = router;
//# sourceMappingURL=user.route.js.map