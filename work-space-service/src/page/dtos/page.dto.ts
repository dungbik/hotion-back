import { InputType, Field, ObjectType, ID, PickType } from '@nestjs/graphql';
import { number } from 'joi';
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

@InputType()
export class UpdatePageInput {
  @Field(() => ID)
  pageId: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
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

  @Field(() => Number, { nullable: true })
  parentId?: number;

  @Field(() => String)
  title: string;

  @Field(() => [Number], { nullable: true })
  children?: number[];

  @Field(() => Boolean)
  isRoot: boolean;

  constructor(page: Page) {
    this.pageId = page.id;
    this.title = page.title;
    this.level = page.level;
    this.parentId = page.parentId;
    this.isRoot = page.parentId === 0;
    this.children = [];
  }
}

@ObjectType()
export class DetailPageOutput {
  @Field(() => String, { nullable: true })
  content?: string;

  constructor(page: Page) {
    this.content = page.content;
  }
}

@ObjectType()
export class UpdatePageOutput {
  @Field(() => Boolean)
  success: boolean;
}
