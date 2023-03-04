"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.groupsModel = connectDB_1.default.define("groups", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    isDelete: sequelize_1.DataTypes.BOOLEAN,
    updateAt: sequelize_1.DataTypes.DATE,
}, {
    timestamps: false,
    tableName: "groups",
});
//# sourceMappingURL=groups.model.js.map