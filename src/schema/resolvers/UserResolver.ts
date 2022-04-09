import { Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { User } from '../../models';
import UserService from '../../services/UserService';

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
}
