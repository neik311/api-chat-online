"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const group_controller_1 = __importDefault(require("../controllers/group.controller"));
const authToken_middlewares_1 = require("../middlewares/authToken.middlewares");
const router = express_1.default.Router();
router.get("/get-group/:sender/:receive", group_controller_1.default.getGroup);
router.get("/get-groups/:userId", group_controller_1.default.getGroupByUser);
router.post("/create-group", authToken_middlewares_1.authUser, group_controller_1.default.createGroup);
router.put("/delete-group", authToken_middlewares_1.authUser, group_controller_1.default.deleteGroup);
exports.default = router;
//# sourceMappingURL=group.route.js.map