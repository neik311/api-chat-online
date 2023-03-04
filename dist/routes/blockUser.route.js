"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blockUser_controller_1 = __importDefault(require("../controllers/blockUser.controller"));
const authToken_middlewares_1 = require("../middlewares/authToken.middlewares");
const router = express_1.default.Router();
router.get("/get-block-user/:blocker/:blocked", blockUser_controller_1.default.getBlockUser);
router.get("/get-block-user/:blocker", blockUser_controller_1.default.getBlockUserByBlocker);
router.post("/create-block-user", authToken_middlewares_1.authUser, blockUser_controller_1.default.createBlockUser);
router.delete("/delete-block-user/:blocker/:blocked", authToken_middlewares_1.authUser, blockUser_controller_1.default.deleteBlockUser);
exports.default = router;
//# sourceMappingURL=blockUser.route.js.map