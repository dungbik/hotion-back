import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';
import { Page } from '../entities/page.entity';

@InputType()
export class CreatePageInput {
  @Field(() => ID)
  workSpaceId: number;

  @Field(() => ID, { nullable: true })
  parentId?: number;

  @Field(() => Number)
  level: number;

  @Field(() => String)
  title: string;
}

@ObjectType()
export class CreatePageOutput {
  @Field(() => ID)
  pageId: number;
}

@ObjectType()
export class SimplePageOutput {
  @Field(() => ID)
  pageId: number;

  @Field(() => Number)
  level: number;

  @Field(() => String)
  title: string;

  @Field(() => [Number])
  children: number[];

  @Field(() => Boolean)
  isRoot: boolean;

  constructor(page: Page) {
    this.pageId = page.id;
    this.title = page.title;
    this.level = page.level;
    this.isRoot = page.parentId ? true : false;
    this.children = [];
  }
}
