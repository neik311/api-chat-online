"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.groupModel = connectDB_1.default.define("group", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sender: sequelize_1.DataTypes.STRING(20),
    receive: sequelize_1.DataTypes.STRING(20),
    isDelete: sequelize_1.DataTypes.BOOLEAN,
    updateAt: sequelize_1.DataTypes.DATE,
}, {
    timestamps: false,
    tableName: "groups",
});
//# sourceMappingURL=group.model.js.map