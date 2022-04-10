import { Arg, Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { daoIdToNodeId } from '../../helpers/nodeId';
import DaoIdentity from '../entities/DaoIdentity';
import NodeArgs from './args/NodeArgs';
import FromDaoIdentityInput from './inputs/FromDaoIdentityInput';

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

  @Query({
    description: 'Get a Node ID by its DAO identity',
    nullable: true,
  })
  fromDaoIdentity(@Arg('input') input: FromDaoIdentityInput): string {
    return daoIdToNodeId(input).nodeId;
  }
}
