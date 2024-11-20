import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  age: number;
}
