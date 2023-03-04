"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authUser = async (req, res, next) => {
    var _a, _b, _c;
    try {
        const accessToken = req.headers.access_token;
        const id = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.id) ||
            ((_b = req.body) === null || _b === void 0 ? void 0 : _b.sender) ||
            ((_c = req.body) === null || _c === void 0 ? void 0 : _c.blocker) ||
            req.params.blocker;
        if (!accessToken) {
            res
                .status(200)
                .json({ statusCode: "411", message: "không thể xác thực" });
            return;
        }
        let key = process.env.JWT_SECRET || "";
        const decoded = jsonwebtoken_1.default.verify(accessToken, key);
        if ((decoded === null || decoded === void 0 ? void 0 : decoded.rule) === "admin") {
            next();
            return;
        }
        if ((decoded === null || decoded === void 0 ? void 0 : decoded.id) !== id) {
            res
                .status(200)
                .json({ statusCode: "412", message: "id người dùng không đúng" });
            return;
        }
        next();
    }
    catch (error) {
        res.status(200).json({ statusCode: "410", message: `${error}` });
    }
};
exports.authUser = authUser;
//# sourceMappingURL=authToken.middlewares.js.map