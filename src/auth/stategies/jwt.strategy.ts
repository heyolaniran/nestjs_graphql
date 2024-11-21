import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/models/user";
import { UserService } from "src/users/users.service";


@Injectable() 
    export class JwtStrategy extends PassportStrategy(Strategy) {

        constructor(private readonly userService : UserService) {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
                ignoreExpiration: false, 
                secretOrKey : process.env.SECRET_KEY
            })
        }

        validate(validation : {email :string , password : string}) : User | null {

            return this.userService.getuserByEmail(validation.email)
        }
    }