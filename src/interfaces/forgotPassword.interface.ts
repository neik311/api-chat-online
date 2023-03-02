import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface forgotPassword
  extends Model<
    InferAttributes<forgotPassword>,
    InferCreationAttributes<forgotPassword>
  > {
  id?: number;
  email: string;
  uniqueString: string;
  createAt: Date;
  effectiveSeconds: number;
  password: string;
}
