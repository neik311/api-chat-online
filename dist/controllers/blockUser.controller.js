"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockUser_service_1 = require("../services/blockUser.service");
const createBlockUser = async (req, res) => {
    try {
        const newBlock = req.body;
        const response = await (0, blockUser_service_1.createBlockUserService)(newBlock);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getBlockUserByBlocker = async (req, res) => {
    try {
        const blocker = req.params.blocker;
        const response = await (0, blockUser_service_1.getBlockUserByBlockerService)(blocker);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getBlockUser = async (req, res) => {
    try {
        const blocker = req.params.blocker;
        const blocked = req.params.blocked;
        const response = await (0, blockUser_service_1.getBlockUserService)(blocker, blocked, "1");
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const deleteBlockUser = async (req, res) => {
    try {
        const blocker = req.params.blocker;
        const blocked = req.params.blocked;
        const response = await (0, blockUser_service_1.deleteBlockUserService)(blocker, blocked);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = {
    createBlockUser,
    getBlockUserByBlocker,
    deleteBlockUser,
    getBlockUser,
};
//# sourceMappingURL=blockUser.controller.js.map