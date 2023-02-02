import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface group
  extends Model<InferAttributes<group>, InferCreationAttributes<group>> {
  id?: number;
  sender: String;
  receive: String;
  isDelete?: Boolean;
  updateAt?: Date;
}
