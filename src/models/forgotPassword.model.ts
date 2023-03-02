import { DataTypes } from "sequelize";
import { forgotPassword } from "../interfaces/forgotPassword.interface";
import sequelize from "../config/connectDB";

export const forgotPasswordModel = sequelize.define<forgotPassword>(
  "forgotpassword",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: DataTypes.STRING(50),
    uniqueString: DataTypes.STRING(50),
    createAt: DataTypes.DATE,
    effectiveSeconds: DataTypes.INTEGER,
    password: DataTypes.STRING(300),
  },
  {
    timestamps: false,
    tableName: "forgotpassword",
  }
);
