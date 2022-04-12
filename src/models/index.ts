import { ModelStatic } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

import { Patient } from './Patient';
import { User } from './User';

export { User } from './User';
export { Patient } from './Patient';

export interface Models {
  User: ModelStatic<User>;
  Patient: ModelStatic<Patient>;
}

export const models = [User, Patient] as ModelCtor[];
