import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validate(email: string, password: string) {
    const user = this.userService.getuserByEmail(email);

    if (!user) {
      return null;
    }

    return password === user.password ? user : null;
  }

  login(user: User): { access_token: string } {
    const access_token = this.jwtService.sign({
      email: user.email,
      uid: user.uid,
    });

    return { access_token };
  }

  verify(token: string): User {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY!,
    });

    const user = this.userService.getuserByEmail(decoded.email);

    if (!decoded)
      throw new HttpException(
        'User not found for given token',
        HttpStatus.FORBIDDEN,
      );

    return user;
  }
}
