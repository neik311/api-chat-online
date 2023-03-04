"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessagesInGroupService = exports.getMessagesInGroupService = exports.createMessagesService = void 0;
const messages_model_1 = require("../models/messages.model");
const group_service_1 = require("./group.service");
const createMessagesService = async (newMessages) => {
    newMessages.createAt = new Date();
    const messages = await messages_model_1.messagesModel.create(newMessages);
    await (0, group_service_1.updateTimeGroupService)(newMessages.groupId);
    return {
        statusCode: "200",
        message: "tạo tin nhắn thành công",
        data: messages,
    };
};
exports.createMessagesService = createMessagesService;
const getMessagesInGroupService = async (groupId) => {
    const allMessaes = await messages_model_1.messagesModel.findAll({
        where: {
            groupId: groupId,
        },
    });
    return {
        statusCode: "200",
        message: "lấy tin nhắn thành công",
        data: allMessaes,
    };
};
exports.getMessagesInGroupService = getMessagesInGroupService;
const deleteMessagesInGroupService = async (messagesId) => {
    await messages_model_1.messagesModel.destroy({
        where: {
            id: messagesId,
        },
    });
    return {
        statusCode: "200",
        message: "xóa tin nhắn thành công",
    };
};
exports.deleteMessagesInGroupService = deleteMessagesInGroupService;
//# sourceMappingURL=messages.service.js.map