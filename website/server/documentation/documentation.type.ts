import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Type {
  @Field({ nullable: false })
  name: string;
  @Field({ nullable: false })
  type: string;
}
