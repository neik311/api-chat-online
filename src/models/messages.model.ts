import { DataTypes } from "sequelize";
import { messages } from "../interfaces/messages.interface";
import sequelize from "../config/connectDB";

export const messagesModel = sequelize.define<messages>(
  "messages",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    groupId: DataTypes.INTEGER,
    messages: DataTypes.STRING(500),
    sender: DataTypes.STRING(20),
    type: DataTypes.STRING(20),
    createAt: DataTypes.DATE,
  },
  {
    timestamps: false,
    tableName: "messages",
  }
);
