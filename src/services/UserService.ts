import { Inject, Service } from 'typedi';

import { User } from '../models';
import UserNotFoundError from '../schema/resolvers/errors/UserNotFoundError';
import SequelizeDatabase from './SequelizeDatabase';
import UserLoader from './UserLoader';

@Service()
export default class UserService {
  @Inject(() => SequelizeDatabase)
  private readonly db!: SequelizeDatabase;
  @Inject(() => UserLoader)
  private readonly userLoader!: UserLoader;

  listUsers(): Promise<User[]> {
    return this.db.UserModel.findAll();
  }

  async loadByNodeId(nodeId: string): Promise<User | undefined> {
    const user = await this.userLoader.load(nodeId);
    if (!user) {
      throw new UserNotFoundError(nodeId);
    }
    return user;
  }
}
