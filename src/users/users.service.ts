import { Injectable } from '@nestjs/common';
import { User } from './models/user';
import { GetUserArgsType } from './dto/args/get-user.args';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { v4 } from 'uuid';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/inputs/delete-user.input';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(createUser: CreateUserInput): User {
    const user = {
      uid: v4(),
      ...createUser,
    };

    this.users.push(user);

    return user;
  }

  getUser(args: GetUserArgsType): User {
    return this.users.find((user) => user.uid == args.uid);
  }

  findAll(usersArgs: GetUsersArgs) {
    return usersArgs.uids.map((uid) => this.getUser({ uid }));
  }

  update(updateUser: UpdateUserInput): User {
    const user = this.users.find((user) => user.uid === updateUser.uid);

    Object.assign(user, updateUser);

    return user;
  }

  remove(deleteUser: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.uid === deleteUser.uid,
    );
    this.users.splice(userIndex);

    return this.users[userIndex];
  }
}
