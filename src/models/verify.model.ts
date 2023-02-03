import { DataTypes } from "sequelize";
import { verify } from "../interfaces/verify.interface";
import sequelize from "../config/connectDB";

export const verifyModel = sequelize.define<verify>(
  "verify",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: DataTypes.STRING(50),
    uniqueString: DataTypes.STRING(50),
    createAt: DataTypes.DATE,
    effectiveSeconds: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: "verify",
  }
);
