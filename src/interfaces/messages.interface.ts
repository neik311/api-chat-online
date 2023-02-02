import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface messages
  extends Model<InferAttributes<messages>, InferCreationAttributes<messages>> {
  id?: number;
  groupId: number;
  messages: string;
  sender: string;
  isDelete?: Boolean;
  createAt?: Date;
}
