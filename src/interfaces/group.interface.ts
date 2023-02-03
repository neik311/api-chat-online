import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface group
  extends Model<InferAttributes<group>, InferCreationAttributes<group>> {
  id?: number;
  sender: string;
  receive: string;
  isDelete?: Boolean;
  updateAt?: Date;
}
