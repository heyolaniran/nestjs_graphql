import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  uid: string;
  email: string;
  age: number;
  isSuscribed?: boolean;
}
