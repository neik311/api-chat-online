"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockUserService = exports.changePasswordUserService = exports.verifyUserService = exports.updateUserService = exports.loginByTokenService = exports.loginService = exports.getAllUserService = exports.getUserService = exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const modern_async_1 = require("modern-async");
const user_model_1 = require("../models/user.model");
const index_1 = require("../index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ACCESS_TIME = 1800;
const REFRESH_TIME = 864000;
const createUserService = async (newUser) => {
    const foundUser = await user_model_1.userModel.findOne({
        where: { [sequelize_1.Op.or]: [{ email: newUser.email }, { id: newUser.id }] },
    });
    if ((foundUser === null || foundUser === void 0 ? void 0 : foundUser.verify) === true) {
        return { statusCode: "400", message: "Tài khoản đã tồn tại" };
    }
    if ((foundUser === null || foundUser === void 0 ? void 0 : foundUser.verify) === false && foundUser.id !== newUser.id) {
        return { statusCode: "400", message: "Tài khoản đã tồn tại" };
    }
    if ((foundUser === null || foundUser === void 0 ? void 0 : foundUser.verify) === false && foundUser.email === newUser.email) {
        await user_model_1.userModel.destroy({
            where: {
                email: foundUser.email,
            },
        });
    }
    newUser.password = bcrypt_1.default.hashSync(newUser.password, bcrypt_1.default.genSaltSync(8));
    newUser.role = "user";
    newUser.describe = (newUser === null || newUser === void 0 ? void 0 : newUser.describe) || "";
    newUser.lock = false;
    newUser.verify = false;
    await user_model_1.userModel.create(newUser);
    return { statusCode: "200", message: "Tạo tài khoản thành công" };
};
exports.createUserService = createUserService;
const getUserByEmail = async (email) => {
    const foundUser = await user_model_1.userModel.findOne({
        where: { email: email, verify: true },
    });
    return foundUser;
};
const getUserById = async (id) => {
    const foundUser = await user_model_1.userModel.findOne({
        where: { id: id, verify: true },
    });
    return foundUser;
};
const getUserService = async (id, email) => {
    const foundUser = await user_model_1.userModel.findOne({
        where: {
            [sequelize_1.Op.or]: [{ email: email }, { id: id }],
            lock: false,
            verify: true,
        },
        attributes: ["id", "firstName", "lastName", "email", "describe", "avatar"],
    });
    return {
        statusCode: "200",
        message: "lấy người dùng thành công",
        data: foundUser,
    };
};
exports.getUserService = getUserService;
const getAllUserService = async () => {
    let foundUser = await user_model_1.userModel.findAll({
        where: {
            role: "user",
            verify: true,
        },
        attributes: ["id", "firstName", "lastName", "email", "avatar", "lock"],
        order: [["id", "ASC"]],
    });
    await (0, modern_async_1.map)(foundUser, (data, index) => {
        const found = index_1.users.find((u) => u.id === data.id);
        foundUser[index].dataValues.status = false;
        if (found) {
            foundUser[index].dataValues.status = true;
        }
    });
    return {
        statusCode: "200",
        message: "lấy người dùng thành công",
        data: foundUser,
    };
};
exports.getAllUserService = getAllUserService;
const getToken = (id, role, type) => {
    let key = process.env.JWT_SECRET || "";
    const payload = {
        id: id,
        rule: role || "",
    };
    if (type === "accessToken") {
        const accessToken = jsonwebtoken_1.default.sign(payload, key, {
            expiresIn: ACCESS_TIME,
        });
        return accessToken;
    }
    const refreshToken = jsonwebtoken_1.default.sign(payload, key, {
        expiresIn: REFRESH_TIME,
    });
    return refreshToken;
};
const loginByTokenService = async (token) => {
    let key = process.env.JWT_SECRET || "";
    try {
        const decoded = jsonwebtoken_1.default.verify(token, key);
        const foundUser = await getUserById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
        if ((foundUser === null || foundUser === void 0 ? void 0 : foundUser.refreshToken) !== token) {
            return { statusCode: "401", message: " token không đúng" };
        }
        const accessToken = getToken(foundUser.id, foundUser === null || foundUser === void 0 ? void 0 : foundUser.role, "accessToken");
        return {
            statusCode: "200",
            message: "Đăng nhập thành công ",
            data: Object.assign(Object.assign({}, foundUser.dataValues), { accessToken }),
        };
    }
    catch (error) {
        return { statusCode: "402", message: "token đã hết hạn" };
    }
};
exports.loginByTokenService = loginByTokenService;
const loginService = async (email, password) => {
    let foundUser = await getUserByEmail(email);
    if (!foundUser) {
        foundUser = await getUserById(email);
    }
    if (!foundUser) {
        return { statusCode: "400", message: "không tìm thấy người dùng" };
    }
    const checkPass = bcrypt_1.default.compareSync(password, foundUser.password);
    if (checkPass === false) {
        return { statusCode: "400", message: "mật khẩu không đúng" };
    }
    if (foundUser.lock === true) {
        return { statusCode: "400", message: "tài khoản đã bị khóa " };
    }
    let refreshToken = "";
    let key = process.env.JWT_SECRET || "";
    if (!foundUser.refreshToken) {
        refreshToken = getToken(foundUser.id, foundUser === null || foundUser === void 0 ? void 0 : foundUser.role, "refreshToken");
        user_model_1.userModel.update({
            refreshToken: refreshToken,
        }, {
            where: {
                id: foundUser.id,
            },
        });
    }
    if (foundUser === null || foundUser === void 0 ? void 0 : foundUser.refreshToken) {
        try {
            jsonwebtoken_1.default.verify(foundUser === null || foundUser === void 0 ? void 0 : foundUser.refreshToken, key);
            refreshToken = foundUser === null || foundUser === void 0 ? void 0 : foundUser.refreshToken;
        }
        catch (error) {
            refreshToken = getToken(foundUser.id, foundUser === null || foundUser === void 0 ? void 0 : foundUser.role, "refreshToken");
            user_model_1.userModel.update({
                refreshToken: refreshToken,
            }, {
                where: {
                    id: foundUser.id,
                },
            });
        }
    }
    const accessToken = getToken(foundUser.id, foundUser === null || foundUser === void 0 ? void 0 : foundUser.role, "accessToken");
    foundUser.password = "";
    return {
        statusCode: "200",
        message: "Đăng nhập thành công",
        data: Object.assign(Object.assign({}, foundUser.dataValues), { accessToken, refreshToken }),
    };
};
exports.loginService = loginService;
const updateUserService = async (newUser) => {
    const foundUser = await user_model_1.userModel.findOne({
        where: { id: newUser.id },
    });
    if (!foundUser) {
        return {
            statusCode: "400",
            message: "không tìm thấy người dùng",
        };
    }
    await user_model_1.userModel.update({
        firstName: newUser.firstName ? newUser.firstName : foundUser.lastName,
        lastName: newUser.lastName ? newUser.lastName : foundUser.lastName,
        birthday: newUser.birthday ? newUser.birthday : foundUser.birthday,
        describe: newUser.describe ? newUser.describe : foundUser.describe,
        avatar: newUser.avatar ? newUser.avatar : foundUser.avatar,
    }, { where: { id: newUser.id } });
    return {
        statusCode: "200",
        message: "cập nhật người dùng thành công ",
    };
};
exports.updateUserService = updateUserService;
const verifyUserService = async (email) => {
    await user_model_1.userModel.update({
        verify: true,
    }, { where: { email: email } });
    return {
        statusCode: "200",
        message: "xác thực người dùng thành công ",
    };
};
exports.verifyUserService = verifyUserService;
const changePasswordUserService = async (email, newpassword) => {
    await user_model_1.userModel.update({
        password: newpassword,
    }, { where: { email: email } });
    return {
        statusCode: "200",
        message: "thay đổi mật khẩu thành công ",
    };
};
exports.changePasswordUserService = changePasswordUserService;
const lockUserService = async (email, lock) => {
    await user_model_1.userModel.update({
        lock: lock,
    }, { where: { email: email } });
    return {
        statusCode: "200",
        message: "cập nhật thành công ",
    };
};
exports.lockUserService = lockUserService;
//# sourceMappingURL=user.service.js.map