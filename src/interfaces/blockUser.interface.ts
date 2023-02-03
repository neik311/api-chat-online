import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface blockUser
  extends Model<
    InferAttributes<blockUser>,
    InferCreationAttributes<blockUser>
  > {
  id: number;
  blocker: string;
  blocked: string;
  createAt?: Date;
}
