import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { userInfo } from 'os';
import { AuthUser } from 'src/auth.decorator';
import {
  CreateWorkSpaceInput,
  WorkSpaceOutput,
} from './dtos/create-work-space.dto';
import { WorkSpaceService } from './work-space.service';

@Resolver()
export class WorkSpaceResolver {
  constructor(private readonly workSpaceService: WorkSpaceService) {}

  @Query(() => [WorkSpaceOutput])
  async getAllWorkSpace(@AuthUser() userId: number) {
    return this.workSpaceService.getAllWorkSpace(userId);
  }

  @Mutation(() => WorkSpaceOutput)
  async createWorkSpace(
    @Args('input') createWorkSpaceInput: CreateWorkSpaceInput,
    @AuthUser() userId: number,
  ): Promise<WorkSpaceOutput> {
    return this.workSpaceService.createWorkSpace(createWorkSpaceInput, userId);
  }
}
