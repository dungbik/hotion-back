import { Resolver, Query } from '@nestjs/graphql';
import { File } from './file.schema';

@Resolver(() => File)
export class FileResolver {
  @Query(() => [File])
  async files() {
    return [];
  }
}
