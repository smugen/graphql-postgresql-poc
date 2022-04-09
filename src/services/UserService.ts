import { Inject, Service } from 'typedi';

import { User } from '../models';
import SequelizeDatabase from './SequelizeDatabase';

@Service()
export default class UserService {
  @Inject(() => SequelizeDatabase)
  private readonly db!: SequelizeDatabase;

  async listUsers(): Promise<User[]> {
    return this.db.UserModel.findAll();
  }
}
