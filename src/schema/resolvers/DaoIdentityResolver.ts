import { Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import DaoIdentity from '../entities/DaoIdentity';
import NodeArgs from './args/NodeArgs';

@Resolver(() => DaoIdentity)
@Service()
export default class DaoIdentityResolver {
  //    ____
  //   / __ \
  //  | |  | |_   _  ___ _ __ _   _
  //  | |  | | | | |/ _ \ '__| | | |
  //  | |__| | |_| |  __/ |  | |_| |
  //   \___\_\\__,_|\___|_|   \__, |
  //                           __/ |
  //                          |___/
  @Query(() => DaoIdentity, {
    description: 'Get a DAO identity by its Node ID',
    nullable: true,
  })
  daoIdentity(@Args() { id }: NodeArgs) {
    return DaoIdentity.from(id);
  }
}
