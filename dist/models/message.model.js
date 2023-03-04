"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.messagesModel = connectDB_1.default.define("messages", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    groupId: sequelize_1.DataTypes.INTEGER,
    message: sequelize_1.DataTypes.STRING(500),
    sender: sequelize_1.DataTypes.STRING(20),
    isDelete: sequelize_1.DataTypes.BOOLEAN,
    createAt: sequelize_1.DataTypes.DATE,
}, {
    timestamps: false,
    tableName: "messages",
});
//# sourceMappingURL=message.model.js.map