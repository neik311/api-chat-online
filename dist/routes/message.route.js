"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_controller_1 = __importDefault(require("../controllers/messages.controller"));
const authToken_middlewares_1 = require("../middlewares/authToken.middlewares");
const router = express_1.default.Router();
router.get("/get-messages/:groupId", messages_controller_1.default.getMessagesInGroup);
router.post("/create-messages", authToken_middlewares_1.authUser, messages_controller_1.default.createMessaes);
router.post("/delete-messages", authToken_middlewares_1.authUser, messages_controller_1.default.deleteMessagesInGroup);
exports.default = router;
//# sourceMappingURL=message.route.js.map