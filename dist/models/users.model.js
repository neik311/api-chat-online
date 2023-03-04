"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.usersModel = connectDB_1.default.define("users", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    username: sequelize_1.DataTypes.STRING(50),
    firstName: sequelize_1.DataTypes.STRING(50),
    lastName: sequelize_1.DataTypes.STRING(50),
    address: sequelize_1.DataTypes.STRING(50),
    birthday: sequelize_1.DataTypes.DATE,
    describe: sequelize_1.DataTypes.STRING(50),
    password: sequelize_1.DataTypes.STRING(300),
    lock: sequelize_1.DataTypes.BOOLEAN,
    role: sequelize_1.DataTypes.STRING(50),
}, {
    timestamps: false,
    tableName: "users",
});
//# sourceMappingURL=users.model.js.map