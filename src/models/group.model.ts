import { DataTypes } from "sequelize";
import { group } from "../interfaces/group.interface";
import sequelize from "../config/connectDB";

export const groupModel = sequelize.define<group>(
  "group",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sender: DataTypes.STRING(20),
    receive: DataTypes.STRING(20),
    isDelete: DataTypes.BOOLEAN,
    updateAt: DataTypes.DATE,
  },
  {
    timestamps: false,
    tableName: "groups",
  }
);
