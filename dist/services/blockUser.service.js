"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlockUserService = exports.getBlockUserByBlockerService = exports.getBlockUserService = exports.createBlockUserService = void 0;
const sequelize_1 = require("sequelize");
const blockUser_model_1 = require("../models/blockUser.model");
const group_service_1 = require("./group.service");
const connectDB_1 = __importDefault(require("../config/connectDB"));
const createBlockUserService = async (newBlock) => {
    newBlock.createAt = new Date();
    await (0, group_service_1.updateIsDeleteGroupService)(newBlock.blocker, newBlock.blocked);
    const blockUser = await blockUser_model_1.blockUserModel.create(newBlock);
    return {
        statusCode: "200",
        message: "tạo blockUser thành công",
        data: blockUser,
    };
};
exports.createBlockUserService = createBlockUserService;
const getBlockUserService = async (blocker, blocked, status) => {
    if (status === "1") {
        const block = await blockUser_model_1.blockUserModel.findOne({
            where: {
                blocker: blocker,
                blocked: blocked,
            },
        });
        return {
            statusCode: "200",
            message: "lấy dữ liệu thành công",
            data: block,
        };
    }
    const block = await blockUser_model_1.blockUserModel.findOne({
        where: {
            [sequelize_1.Op.or]: [
                { blocker: blocker, blocked: blocked },
                { blocker: blocked, blocked: blocker },
            ],
        },
    });
    return { statusCode: "200", message: "lấy dữ liệu thành công", data: block };
};
exports.getBlockUserService = getBlockUserService;
const getBlockUserByBlockerService = async (blocker) => {
    const data = await connectDB_1.default.query(`SELECT DISTINCT b.id,b.blocker,b.blocked,u.avatar FROM blockuser as b,users as u where b.blocker = "${blocker}" and b.blocked = u.id`);
    return {
        statusCode: "200",
        message: "lấy dữ liệu thành công",
        data: data[0],
    };
};
exports.getBlockUserByBlockerService = getBlockUserByBlockerService;
const deleteBlockUserService = async (blocker, blocked) => {
    await blockUser_model_1.blockUserModel.destroy({
        where: {
            blocker: blocker,
            blocked: blocked,
        },
    });
    return { statusCode: "200", message: "xóa chặn người dùng thành công" };
};
exports.deleteBlockUserService = deleteBlockUserService;
//# sourceMappingURL=blockUser.service.js.map