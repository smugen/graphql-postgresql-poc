import DataLoader from 'dataloader';
import { Inject, Service } from 'typedi';

import { toDaoIdentity } from '../helpers/nodeId';
import { User } from '../models';
import SequelizeDatabase from './SequelizeDatabase';

type LoadUserKey = string;

@Service()
export default class UserLoader extends DataLoader<
  LoadUserKey,
  User | undefined
> {
  constructor(
    @Inject(() => SequelizeDatabase) { UserModel }: SequelizeDatabase,
  ) {
    const batchQuery = async (keys: readonly LoadUserKey[]) => {
      const id = [
        ...new Set(
          keys
            .map(k => toDaoIdentity(k))
            .filter(({ modelName: m }) => m === User.name)
            .map(({ _id }) => _id),
        ),
      ];
      const users = await UserModel.findAll({ where: { id } });
      return keys.map(key => users.find(user => user.nodeId === key));
    };

    super(batchQuery, { cache: false });
  }
}
