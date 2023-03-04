"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_service_1 = require("../services/messages.service");
const createMessaes = async (req, res) => {
    try {
        const newMessages = req.body;
        const response = await (0, messages_service_1.createMessagesService)(newMessages);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getMessagesInGroup = async (req, res) => {
    try {
        const groupId = Number(req.params.groupId);
        const response = await (0, messages_service_1.getMessagesInGroupService)(groupId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const deleteMessagesInGroup = async (req, res) => {
    try {
        const messagesId = req.body.messagesId;
        const response = await (0, messages_service_1.deleteMessagesInGroupService)(messagesId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = {
    createMessaes,
    getMessagesInGroup,
    deleteMessagesInGroup,
};
//# sourceMappingURL=messages.controller.js.map