import { DataTypes } from 'sequelize';
import { AllowNull, Column, Table } from 'sequelize-typescript';
import { Directive, Field, ObjectType } from 'type-graphql';

import GraphNode from '../schema/entities/GraphNode';
import Model from './Model';

@Directive(`@key(fields: "id")`)
@ObjectType({ implements: [GraphNode, Model] })
@Table<User>({ tableName: 'user' })
export class User extends Model<User> {
  protected get _modelName(): string {
    return this.constructor.name;
  }

  @Field({
    description: 'The User username',
  })
  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
    // comment: 'ユーザー名',
  })
  username!: string;

  @Field({
    description: 'The User full name',
  })
  @AllowNull(false)
  @Column(DataTypes.TEXT)
  fullName!: string;

  @Field({
    description: 'The User id number',
  })
  @AllowNull(false)
  @Column(DataTypes.TEXT)
  idNumber!: string;

  @Field({
    description: 'The User email',
  })
  @AllowNull(false)
  @Column(DataTypes.TEXT)
  email!: string;

  @Field({
    description: 'The User role',
  })
  @AllowNull(false)
  @Column(DataTypes.TEXT)
  role!: string;
}
