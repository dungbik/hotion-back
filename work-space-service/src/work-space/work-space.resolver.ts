import { Resolver, Query } from '@nestjs/graphql';
import { WorkSpace } from './work-space.schema';

@Resolver(() => WorkSpace)
export class WorkSpaceResolver {
  @Query(() => [WorkSpace])
  async workspaces() {
    return [];
  }
}
