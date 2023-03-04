"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const user_service_1 = require("../services/user.service");
const sendEmail_1 = require("../utils/sendEmail");
const verify_service_1 = require("../services/verify.service");
const forgotPassword_service_1 = require("../services/forgotPassword.service");
const createUser = async (req, res) => {
    try {
        const newUser = req.body;
        const response = await (0, user_service_1.createUserService)(newUser);
        if (response.statusCode === "200") {
            const uniqueString = (0, uuid_1.v4)();
            await (0, sendEmail_1.sendVerificationEmail)(newUser.email, uniqueString);
            const newVerify = {
                email: newUser.email,
                uniqueString: uniqueString,
            };
            await (0, verify_service_1.createVerifyService)(newVerify);
        }
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const createForgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await (0, user_service_1.getUserService)("", email);
        if (!response.data) {
            res
                .status(200)
                .json({ statusCode: "400", message: "Tài khoản không tồn tại" });
            return;
        }
        const uniqueString = (0, uuid_1.v4)();
        await (0, sendEmail_1.sendVerifiForgotPassword)(email, uniqueString);
        const newVerify = {
            email: email,
            uniqueString: uniqueString,
            password: password,
        };
        await (0, forgotPassword_service_1.createVerifyPasswordService)(newVerify);
        res.status(200).json({ statusCode: "200", message: "Tạo thành công" });
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const updateUser = async (req, res) => {
    try {
        const newUser = req.body;
        const response = await (0, user_service_1.updateUserService)(newUser);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const lockUser = async (req, res) => {
    try {
        const { email, lock } = req.body;
        const response = await (0, user_service_1.lockUserService)(email, lock);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getUser = async (req, res) => {
    try {
        const id = req.query.id || "";
        const email = req.query.email || "";
        const response = await (0, user_service_1.getUserService)(id, email);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getAllUser = async (_req, res) => {
    try {
        const response = await (0, user_service_1.getAllUserService)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const response = await (0, user_service_1.loginService)(email, password);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const loginByToken = async (req, res) => {
    try {
        const token = req.body.refreshToken;
        const response = await (0, user_service_1.loginByTokenService)(token);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const sendMail = async (req, res) => {
    try {
        const email = req.body.email;
        const uniqueString = (0, uuid_1.v4)();
        await (0, sendEmail_1.sendVerificationEmail)(email, uniqueString);
        res
            .status(200)
            .json({ statusCode: "200", message: "gửi email thành công" });
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const verifyEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const uniqueString = req.params.uniqueString;
        const foundVerify = (await (0, verify_service_1.getVerifyService)(email, uniqueString)).data;
        if (!foundVerify) {
            const message = "Tài khoản không tồn tại hoặc đã được xác minh";
            res.redirect(`/user/verified?error=true&message=${message}`);
            return;
        }
        if (foundVerify.createAt.getTime() + foundVerify.effectiveSeconds * 1000 <
            new Date().getTime()) {
            const message = "Liên kết đã hết hạn, vui lòng đăng ký lại";
            res.redirect(`/user/verified?error=true&message=${message}`);
            return;
        }
        await (0, verify_service_1.deleteVerifyService)(email);
        await (0, user_service_1.verifyUserService)(email);
        res.redirect(`/user/verified`);
    }
    catch (error) {
        console.log(error);
        const message = "Đã xảy ra lỗi khi kiểm tra xác minh người dùng hiện tại";
        res.redirect(`/user/verified?error=true&message=${message}`);
    }
};
const verifyChangePassword = async (req, res) => {
    try {
        const email = req.params.email;
        const uniqueString = req.params.uniqueString;
        const foundVerify = (await (0, forgotPassword_service_1.getVerifyPasswordService)(email, uniqueString)).data;
        if (!foundVerify) {
            const message = "Tài khoản không tồn tại hoặc đã được xác minh";
            res.redirect(`/user/verified?error=true&message=${message}`);
            return;
        }
        if (foundVerify.createAt.getTime() + foundVerify.effectiveSeconds * 1000 <
            new Date().getTime()) {
            const message = "Liên kết đã hết hạn, vui lòng đăng ký lại";
            res.redirect(`/user/verified?error=true&message=${message}`);
            return;
        }
        await (0, forgotPassword_service_1.deleteVerifyPasswordService)(email);
        await (0, user_service_1.changePasswordUserService)(email, foundVerify.password);
        res.redirect(`/user/verified`);
    }
    catch (error) {
        console.log(error);
        const message = "Đã xảy ra lỗi khi kiểm tra xác minh người dùng hiện tại";
        res.redirect(`/user/verified?error=true&message=${message}`);
    }
};
const verified = (_req, res) => {
    try {
        console.log(__dirname);
        res.sendFile(path_1.default.join(__dirname, "./../views/verified.html"));
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = {
    createUser,
    login,
    loginByToken,
    getUser,
    getAllUser,
    updateUser,
    sendMail,
    verifyEmail,
    verified,
    createForgotPassword,
    verifyChangePassword,
    lockUser,
};
//# sourceMappingURL=user.controller.js.map