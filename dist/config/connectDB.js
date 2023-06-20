"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databaseName = "chatonline";
const userName = "root";
const password = "123456";
const host = "localhost";
const sequelize = new sequelize_1.Sequelize(databaseName, userName, password, {
    host: host,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});
exports.default = sequelize;
//# sourceMappingURL=connectDB.js.map