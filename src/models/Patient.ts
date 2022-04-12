import { UUIDResolver } from 'graphql-scalars';
import { DataTypes } from 'sequelize';
import { AllowNull, Column, ForeignKey, Table } from 'sequelize-typescript';
import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from 'type-graphql';

import { daoIdToNodeId } from '../helpers/nodeId';
import GraphNode from '../schema/entities/GraphNode';
import Citizen from './Citizen';
import Model from './Model';
import { User } from './User';

export enum Sex {
  Male = 'male',
  Female = 'female',
}

registerEnumType(Sex, {
  name: 'Sex',
  description: 'The Patient sex',
});

@Directive(`@key(fields: "id")`)
@ObjectType({ implements: [GraphNode, Model] })
@Table<Patient>({ tableName: 'patient' })
export class Patient extends Citizen<Patient> {
  protected get _modelName(): string {
    return this.constructor.name;
  }

  @Field({
    description: 'The Patient case number',
  })
  @AllowNull(false)
  @Column(DataTypes.TEXT)
  caseNumber!: string;

  @Field({
    description: 'The Patient birth date',
    nullable: true,
  })
  @AllowNull(true)
  @Column(DataTypes.DATEONLY)
  birthDate?: Date;

  @Field(() => Sex, {
    description: 'The Patient sex',
    nullable: true,
  })
  @AllowNull(true)
  @Column(DataTypes.ENUM(...Object.values(Sex)))
  get sex(): Sex | null | undefined {
    const val = this.getDataValue('sex');
    switch (val) {
      case Sex.Male:
      case Sex.Female:
      case null:
      case void 0:
        return val;

      default:
        throw new TypeError(`Unknown sex ${val}`);
    }
  }
  set sex(val: Sex | null | undefined) {
    switch (val) {
      case Sex.Male:
      case Sex.Female:
      case null:
      case void 0:
        this.setDataValue('sex', val);
        break;

      default:
        throw new TypeError(`Unknown sex ${val}`);
    }
  }

  @Field(() => UUIDResolver, {
    name: '_visitingDoctorId',
    description: 'The Patient visiting doctor DAO ID',
    nullable: true,
  })
  @ForeignKey(() => User)
  @AllowNull(true)
  @Column(DataTypes.UUID)
  visitingDoctorId?: string | null;

  @Field(() => ID, {
    name: 'visitingDoctorId',
    description: 'The Patient visiting doctor Node ID',
    nullable: true,
  })
  get visitingDoctorNodeId(): string | undefined {
    const { visitingDoctorId: _id } = this;
    if (!_id) {
      return;
    }
    return daoIdToNodeId({ modelName: User.name, _id }).nodeId;
  }

  @Field(() => User, {
    description: 'The Patient visiting doctor',
    nullable: true,
  })
  visitingDoctor?: User;
}
