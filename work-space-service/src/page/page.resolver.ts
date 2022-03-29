import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth.decorator';
import {
  CreatePageInput,
  CreatePageOutput,
  DetailPageOutput,
  SimplePageOutput,
  UpdatePageInput,
  UpdatePageOutput,
} from './dtos/page.dto';
import { PageService } from './page.service';

@Resolver()
export class PageResolver {
  constructor(private readonly pageService: PageService) {}

  @Query(() => [SimplePageOutput])
  async getAllPage(
    @Args({ name: 'workSpaceId', type: () => Number }) workSpaceId: number,
    @AuthUser() userId: number,
  ): Promise<SimplePageOutput[]> {
    return this.pageService.getAllPage(workSpaceId, userId);
  }

  @Query(() => DetailPageOutput)
  async getPage(
    @Args({ name: 'pageId', type: () => Number }) pageId: number,
    @AuthUser() userId: number,
  ): Promise<DetailPageOutput> {
    return this.pageService.getPage(pageId, userId);
  }

  @Mutation(() => CreatePageOutput)
  async createPage(
    @Args('input') createPageInput: CreatePageInput,
    @AuthUser() userId: number,
  ): Promise<CreatePageOutput> {
    return this.pageService.createPage(createPageInput, userId);
  }

  @Mutation(() => UpdatePageOutput)
  async updatePage(
    @Args('input') updatePageInput: UpdatePageInput,
    @AuthUser() userId: number,
  ): Promise<UpdatePageOutput> {
    return this.pageService.updatePage(updatePageInput, userId);
  }
}
