import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user';
import { UserService } from './users.service';
import { GetUserArgsType } from './dto/args/get-user.args';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { GetUsersArgs } from './dto/args/get-users.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgsType) {
    return this.userService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  getUsers(@Args() uids: GetUsersArgs) {
    return this.userService.findAll(uids);
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.create(createUserData);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput) {
    return this.userService.update(updateUserData);
  }

  @Mutation(() => User)
  delete(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
    return this.userService.remove(deleteUserData);
  }
}
