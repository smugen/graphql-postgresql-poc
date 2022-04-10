import { DataTypes } from 'sequelize';
import { AllowNull, Column } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';

import Model from './Model';

@ObjectType()
export default abstract class Citizen<M extends Model<M>> extends Model<M> {
  @Field({
    description: 'The Citizen full name',
  })
  @AllowNull(false)
  @Column(DataTypes.TEXT)
  fullName!: string;

  @Field({
    description: 'The Citizen id number',
  })
  @AllowNull(false)
  @Column(DataTypes.TEXT)
  idNumber!: string;
}
