import { Sequelize } from "sequelize";

const databaseName = "chatonline";
const userName = "root";
const password = "123456";
const host = "localhost";

const sequelize = new Sequelize(databaseName, userName, password, {
  host: host,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default sequelize;
