"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockUserModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.blockUserModel = connectDB_1.default.define("blockUser", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    blocker: sequelize_1.DataTypes.STRING(20),
    blocked: sequelize_1.DataTypes.STRING(20),
    createAt: sequelize_1.DataTypes.DATE,
}, {
    timestamps: false,
    tableName: "blockUser",
});
//# sourceMappingURL=blockUser.model.js.map