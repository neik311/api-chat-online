"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.verifyModel = connectDB_1.default.define("verify", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: sequelize_1.DataTypes.STRING(50),
    uniqueString: sequelize_1.DataTypes.STRING(50),
    createAt: sequelize_1.DataTypes.DATE,
    effectiveSeconds: sequelize_1.DataTypes.INTEGER,
}, {
    timestamps: false,
    tableName: "verify",
});
//# sourceMappingURL=verify.model.js.map