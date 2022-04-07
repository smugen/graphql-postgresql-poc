import { DataTypes } from 'sequelize';
import { AllowNull, Column, Table } from 'sequelize-typescript';

import Model from './Model';

@Table<User>({ tableName: 'user' })
export class User extends Model<User> {
  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
    // comment: 'ユーザー名',
  })
  username!: string;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  fullName!: string;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  idNumber!: string;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  email!: string;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  role!: string;
}
