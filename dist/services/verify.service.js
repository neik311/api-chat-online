"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerifyService = exports.deleteVerifyService = exports.createVerifyService = void 0;
const verify_model_1 = require("../models/verify.model");
const createVerifyService = async (newVerify) => {
    newVerify.createAt = new Date();
    newVerify.effectiveSeconds = 3600;
    await verify_model_1.verifyModel.create(newVerify);
    return { statusCode: "200", message: "tạo xác minh thành công" };
};
exports.createVerifyService = createVerifyService;
const getVerifyService = async (email, uniqueString) => {
    const foundVerify = await verify_model_1.verifyModel.findOne({
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
exports.getVerifyService = getVerifyService;
const deleteVerifyService = async (email) => {
    await verify_model_1.verifyModel.destroy({
        where: {
            email: email,
        },
    });
    return { statusCode: "200", message: "xóa xác minh thành công" };
};
exports.deleteVerifyService = deleteVerifyService;
//# sourceMappingURL=verify.service.js.map