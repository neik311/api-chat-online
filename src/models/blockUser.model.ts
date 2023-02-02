import { DataTypes } from "sequelize";
import { blockUser } from "../interfaces/blockUser.interface";
import sequelize from "../config/connectDB";

export const blockUserModel = sequelize.define<blockUser>(
  "blockUser",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    blocker: DataTypes.STRING(20),
    blocked: DataTypes.STRING(20),
    createAt: DataTypes.DATE,
  },
  {
    timestamps: false,
    tableName: "blockUser",
  }
);
