import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface user
  extends Model<InferAttributes<user>, InferCreationAttributes<user>> {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday?: Date;
  describe?: string;
  password: string;
  avatar?: string;
  lock?: Boolean;
  role?: string;
  verify?: boolean;
}
