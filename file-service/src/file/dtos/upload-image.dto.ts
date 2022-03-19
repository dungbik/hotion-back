import { Field, InputType, ObjectType, ID } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class UploadFileInput {
  @Field(() => GraphQLUpload)
  file: FileUpload;
}

@ObjectType()
export class UploadFileOutput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  fileName: string;

  @Field(() => String)
  url: string;
}
