import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Type {
  @Field({ nullable: false })
  name: string;
  @Field({ nullable: false })
  type: string;
}
