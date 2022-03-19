import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UploadFileOutput } from './dtos/upload-image.dto';
import { Upload, GraphQLUpload } from 'graphql-upload';
import { FileService } from './file.service';
import { File } from './file.schema';

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Query(() => [File])
  async files() {
    return [];
  }

  @Mutation(() => UploadFileOutput)
  async uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: Upload,
  ): Promise<UploadFileOutput> {
    return this.fileService.uploadImage(file);
  }
}
