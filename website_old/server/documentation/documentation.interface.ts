import { Field, ObjectType } from '@nestjs/graphql';
import { Meta, Tag } from '../page/page.interface';

@ObjectType()
export class Flags {
  @Field((type) => String, { nullable: true })
  isDeprecated?: boolean | string;
  @Field({ nullable: true })
  isOptional?: boolean;
  @Field({ nullable: true })
  isPrivate?: boolean;
}

@ObjectType()
export class Block {
  @Field((type) => [Tag])
  contents: Tag[];
  @Field((type) => Meta)
  metadata: Meta;
}

@ObjectType()
export class Property {
  @Field() name: string;
  @Field({ nullable: true })
  defaultValue?: string;
  @Field() type: string;
  @Field({ nullable: true })
  inheritedFrom?: string;
  @Field((type) => Block)
  documentation: Block;
  @Field((type) => Flags, { nullable: true })
  flags?: Flags;
}

@ObjectType()
export class Interface {
  @Field() name: string;
  @Field((type) => [String], { nullable: true })
  extends?: string[];
  @Field((type) => [Property])
  properties: Property[];
  @Field((type) => Block)
  documentation: Block;
}
