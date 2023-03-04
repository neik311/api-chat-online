"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerifyPasswordService = exports.deleteVerifyPasswordService = exports.createVerifyPasswordService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const forgotPassword_model_1 = require("../models/forgotPassword.model");
const createVerifyPasswordService = async (newVerify) => {
    newVerify.createAt = new Date();
    newVerify.effectiveSeconds = 600;
    newVerify.password = bcrypt_1.default.hashSync(newVerify.password, bcrypt_1.default.genSaltSync(8));
    await forgotPassword_model_1.forgotPasswordModel.create(newVerify);
    return { statusCode: "200", message: "tạo xác minh thành công" };
};
exports.createVerifyPasswordService = createVerifyPasswordService;
const getVerifyPasswordService = async (email, uniqueString) => {
    const foundVerify = await forgotPassword_model_1.forgotPasswordModel.findOne({
        where: {
            email: email,
            uniqueString: uniqueString,
        },
    });
    return {
        statusCode: "200",
        message: "lấy xác minh thành công",
        data: foundVerify,
    };
};
exports.getVerifyPasswordService = getVerifyPasswordService;
const deleteVerifyPasswordService = async (email) => {
    await forgotPassword_model_1.forgotPasswordModel.destroy({
        where: {
            email: email,
        },
    });
    return { statusCode: "200", message: "xóa xác minh thành công" };
};
exports.deleteVerifyPasswordService = deleteVerifyPasswordService;
//# sourceMappingURL=forgotPassword.service.js.map