import { ModelStatic } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

import { User } from './User';

export { User } from './User';

export interface Models {
  User: ModelStatic<User>;
}

export const models = [User] as ModelCtor[];
