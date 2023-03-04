"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const group_service_1 = require("../services/group.service");
const createGroup = async (req, res) => {
    try {
        const newGroup = req.body;
        const response = await (0, group_service_1.createGroupService)(newGroup);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getGroupByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await (0, group_service_1.getGroupByUserService)(userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getGroup = async (req, res) => {
    try {
        const sender = req.params.sender;
        const receive = req.params.receive;
        const response = await (0, group_service_1.getGroupService)(sender, receive);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const deleteGroup = async (req, res) => {
    try {
        const sender = req.body.sender;
        const receive = req.body.receive;
        const response = await (0, group_service_1.updateIsDeleteGroupService)(sender, receive);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = {
    createGroup,
    getGroupByUser,
    deleteGroup,
    getGroup,
};
//# sourceMappingURL=group.controller.js.map