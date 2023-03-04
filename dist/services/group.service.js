"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTimeGroupService = exports.getGroupService = exports.updateIsDeleteGroupService = exports.getGroupByUserService = exports.createGroupService = void 0;
const sequelize_1 = require("sequelize");
const group_model_1 = require("../models/group.model");
const blockUser_service_1 = require("./blockUser.service");
const createGroupService = async (newGroup) => {
    newGroup.isDelete = false;
    newGroup.updateAt = new Date();
    const foundBlock = (await (0, blockUser_service_1.getBlockUserService)(newGroup.sender, newGroup.receive)).data;
    if (foundBlock) {
        if (foundBlock.blocker === newGroup.sender) {
            return {
                statusCode: "401",
                message: "bạn đã chặn người dùng này",
            };
        }
        return {
            statusCode: "402",
            message: "Người dùng này đã chặn bạn",
        };
    }
    if (newGroup.sender > newGroup.receive) {
        let coppy = newGroup.sender;
        newGroup.sender = newGroup.receive;
        newGroup.receive = coppy;
    }
    let foundGroup = await group_model_1.groupModel.findOne({
        where: {
            sender: newGroup.sender,
            receive: newGroup.receive,
        },
    });
    if (!foundGroup) {
        const group = await group_model_1.groupModel.create(newGroup);
        return {
            statusCode: "200",
            message: "tạo kết nối thành công",
            data: group,
        };
    }
    if ((foundGroup === null || foundGroup === void 0 ? void 0 : foundGroup.isDelete) === true) {
        await group_model_1.groupModel.update({ isDelete: false, updateAt: new Date() }, { where: { id: foundGroup === null || foundGroup === void 0 ? void 0 : foundGroup.id } });
        return {
            statusCode: "200",
            message: "tạo kết nối thành công",
            data: foundGroup,
        };
    }
    return {
        statusCode: "403",
        message: "Bạn đã kết nối với người dùng này",
    };
};
exports.createGroupService = createGroupService;
const getGroupByUserService = async (userId) => {
    const foundGroup = await group_model_1.groupModel.findAll({
        where: {
            [sequelize_1.Op.or]: [{ sender: userId }, { receive: userId }],
            isDelete: false,
        },
        order: [["updateAt", "DESC"]],
    });
    return {
        statusCode: "200",
        message: "",
        data: foundGroup,
    };
};
exports.getGroupByUserService = getGroupByUserService;
const getGroupService = async (sender, receive) => {
    if (sender > receive) {
        let coppy = sender;
        sender = receive;
        receive = coppy;
    }
    const foundGroup = await group_model_1.groupModel.findOne({
        where: {
            sender: sender,
            receive: receive,
            isDelete: false,
        },
    });
    return {
        statusCode: "200",
        message: "lấy dữ liệu thành công",
        data: foundGroup,
    };
};
exports.getGroupService = getGroupService;
const updateIsDeleteGroupService = async (sender, receive) => {
    if (sender > receive) {
        let coppy = sender;
        sender = receive;
        receive = coppy;
    }
    await group_model_1.groupModel.update({
        isDelete: true,
        updateAt: new Date(),
    }, {
        where: { sender: sender, receive: receive },
    });
    return {
        statusCode: "200",
        message: "cập nhật thành công",
    };
};
exports.updateIsDeleteGroupService = updateIsDeleteGroupService;
const updateTimeGroupService = async (id) => {
    await group_model_1.groupModel.update({
        updateAt: new Date(),
    }, {
        where: { id: id },
    });
    return {
        statusCode: "200",
        message: "cập nhật thành công",
    };
};
exports.updateTimeGroupService = updateTimeGroupService;
//# sourceMappingURL=group.service.js.map