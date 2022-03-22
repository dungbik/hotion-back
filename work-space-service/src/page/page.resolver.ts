import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth.decorator';
import {
  CreatePageInput,
  CreatePageOutput,
  SimplePageOutput,
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

  @Mutation(() => CreatePageOutput)
  async createPage(
    @Args('input') createPageInput: CreatePageInput,
    @AuthUser() userId: number,
  ): Promise<CreatePageOutput> {
    return this.pageService.createPage(createPageInput, userId);
  }
}
