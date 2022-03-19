import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UploadFileOutput } from './dtos/upload-image.dto';
import { Upload, GraphQLUpload } from 'graphql-upload';
import { FileService } from './file.service';

@Resolver(() => UploadFileOutput)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Query(() => [UploadFileOutput])
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
