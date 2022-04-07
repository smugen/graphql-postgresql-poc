import { inspect } from 'util';

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  Column,
  CreatedAt,
  DeletedAt,
  PrimaryKey,
  Model as STSModel,
  UpdatedAt,
} from 'sequelize-typescript';

export default abstract class Model<M extends STSModel> extends STSModel<
  InferAttributes<M>,
  InferCreationAttributes<M>
> {
  [inspect.custom]() {
    return this.toJSON();
  }

  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  declare readonly id: CreationOptional<string>;

  @CreatedAt
  declare readonly createdAt?: Date | null;

  @UpdatedAt
  declare readonly updatedAt?: Date | null;

  @DeletedAt
  declare readonly deletedAt?: Date | null;
}
