import { inspect } from 'util';

import { UUIDResolver } from 'graphql-scalars';
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
import { Field, ID, InterfaceType } from 'type-graphql';

import { daoIdToNodeId } from '../helpers/nodeId';
import GraphNode from '../schema/entities/GraphNode';

interface IModel {
  readonly id: CreationOptional<string>;
  readonly createdAt?: Date | null;
  readonly updatedAt?: Date | null;
  readonly deletedAt?: Date | null;
}

@InterfaceType('DaoNode', { implements: GraphNode })
export default abstract class Model<M extends STSModel = STSModel>
  extends STSModel<
    InferAttributes<M & IModel>,
    InferCreationAttributes<M & IModel>
  >
  implements IModel, GraphNode
{
  [inspect.custom]() {
    return this.toJSON();
  }

  toJSON() {
    const { modelName, nodeId } = this;
    return {
      ...super.toJSON(),
      modelName,
      nodeId,
    };
  }

  protected abstract get _modelName(): string;

  @Field({
    description: 'The DAO model name',
  })
  get modelName(): string {
    return this._modelName;
  }

  @Field(() => ID, {
    name: 'id',
    description: 'The Node ID',
  })
  get nodeId(): string {
    const { modelName, id } = this;
    return daoIdToNodeId({ modelName, _id: id }).nodeId;
  }

  @Field(() => UUIDResolver, {
    name: '_id',
    description: 'The DAO ID',
  })
  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  readonly id!: CreationOptional<string>;

  @Field(() => Date, {
    description: 'The DAO created at.',
    nullable: true,
  })
  @CreatedAt
  readonly createdAt?: Date | null;

  @Field(() => Date, {
    description: 'The DAO updated at.',
    nullable: true,
  })
  @UpdatedAt
  readonly updatedAt?: Date | null;

  @Field(() => Date, {
    description: 'The DAO deleted at.',
    nullable: true,
  })
  @DeletedAt
  readonly deletedAt?: Date | null;
}
