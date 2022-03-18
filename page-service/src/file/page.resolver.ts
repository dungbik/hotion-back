import { Query, Resolver } from '@nestjs/graphql';
import { Page } from './page.schema';

@Resolver(() => Page)
export class PageResolver {
  @Query(() => [Page])
  async pages() {
    return [];
  }
}
