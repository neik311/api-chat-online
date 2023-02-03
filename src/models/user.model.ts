import { DataTypes } from "sequelize";
import { user } from "../interfaces/user.interface";
import sequelize from "../config/connectDB";

export const userModel = sequelize.define<user>(
  "users",
  {
    id: { type: DataTypes.STRING(20), primaryKey: true },
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    birthday: DataTypes.DATE,
    describe: DataTypes.STRING(50),
    password: DataTypes.STRING(300),
    avatar: DataTypes.STRING(200),
    lock: DataTypes.BOOLEAN,
    role: DataTypes.STRING(50),
    verify: DataTypes.BOOLEAN,
  },
  {
    timestamps: false,
    tableName: "users",
  }
);
