"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.forgotPasswordModel = connectDB_1.default.define("forgotpassword", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: sequelize_1.DataTypes.STRING(50),
    uniqueString: sequelize_1.DataTypes.STRING(50),
    createAt: sequelize_1.DataTypes.DATE,
    effectiveSeconds: sequelize_1.DataTypes.INTEGER,
    password: sequelize_1.DataTypes.STRING(300),
}, {
    timestamps: false,
    tableName: "forgotpassword",
});
//# sourceMappingURL=forgotPassword.model.js.map