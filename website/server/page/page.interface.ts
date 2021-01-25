import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Meta {
  @Field({ nullable: true })
  reference?: string;
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  fileSource?: string;
  @Field({ nullable: true })
  tabName?: string;
  @Field({ nullable: true })
  disabled?: boolean;
  @Field({ nullable: true })
  hide?: boolean;
}

@ObjectType()
export class Tag {
  @Field() tag: string;
  @Field({ nullable: true })
  value?: string;
  @Field({ nullable: true })
  options?: string;
  @Field({ nullable: true })
  route?: string;
  @Field({ nullable: true })
  level?: string;
}

@ObjectType()
export class Page {
  @Field() reference: string;
  @Field() route: string;
  @Field() title: string;
  @Field() sourcePath: string;
  @Field((type) => [Tag])
  contents: Tag[];
  @Field((type) => Meta)
  metadata: Meta;
}

@ObjectType()
export class Navigation {
  @Field({ nullable: true })
  reference: string;
  @Field() route: string;
  @Field() title: string;
  // @Field(type => Int)
  // level: number;
  @Field((type) => [Navigation], { nullable: true })
  children?: Navigation[];
  @Field((type) => Meta, { nullable: true })
  metadata?: Meta;
}

@ObjectType()
export class Heading {
  @Field() route: string;
  @Field() title: string;
  @Field((type) => Int)
  level: number;
}
