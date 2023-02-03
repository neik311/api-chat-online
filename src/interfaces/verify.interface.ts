import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface verify
  extends Model<InferAttributes<verify>, InferCreationAttributes<verify>> {
  id?: number;
  email: string;
  uniqueString: string;
  createAt: Date;
  effectiveSeconds: number;
}
