"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.userModel = connectDB_1.default.define("users", {
    id: { type: sequelize_1.DataTypes.STRING(20), primaryKey: true },
    firstName: sequelize_1.DataTypes.STRING(50),
    lastName: sequelize_1.DataTypes.STRING(50),
    email: sequelize_1.DataTypes.STRING(50),
    birthday: sequelize_1.DataTypes.DATE,
    describe: sequelize_1.DataTypes.STRING(50),
    password: sequelize_1.DataTypes.STRING(300),
    avatar: sequelize_1.DataTypes.STRING(1000),
    lock: sequelize_1.DataTypes.BOOLEAN,
    role: sequelize_1.DataTypes.STRING(50),
    verify: sequelize_1.DataTypes.BOOLEAN,
    refreshToken: sequelize_1.DataTypes.STRING(500),
}, {
    timestamps: false,
    tableName: "users",
});
//# sourceMappingURL=user.model.js.map