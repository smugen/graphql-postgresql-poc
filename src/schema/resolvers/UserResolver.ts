import { Args, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { User } from '../../models';
import UserService from '../../services/UserService';
import NodeArgs from './args/NodeArgs';

@Resolver(() => User)
@Service()
export default class UserResolver {
  @Inject(() => UserService)
  private readonly userService!: UserService;

  //    ____
  //   / __ \
  //  | |  | |_   _  ___ _ __ _   _
  //  | |  | | | | |/ _ \ '__| | | |
  //  | |__| | |_| |  __/ |  | |_| |
  //   \___\_\\__,_|\___|_|   \__, |
  //                           __/ |
  //                          |___/
  @Query(() => [User], {
    description: 'Get all users',
  })
  users() {
    return this.userService.listUsers();
  }

  @Query(() => User, {
    description: 'Get a user by nodeId',
    nullable: true,
  })
  user(@Args() { id }: NodeArgs) {
    return this.userService.loadByNodeId(id);
  }
}
