import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  uid: string;

  @Field(() => Int, {nullable: true})
  @IsOptional()
  age?: number;

  @Field(() => Boolean, {nullable : true})
  @IsBoolean()
  isSubscribed?: boolean;
}
