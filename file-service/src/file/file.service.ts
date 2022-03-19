import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { promisify } from 'util';
import * as AWS from 'aws-sdk';
import { UploadFileOutput } from './dtos/upload-image.dto';
import { Upload } from 'graphql-upload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
      region: configService.get('S3_REGION'),
    });

    this.s3 = new AWS.S3();
  }

  async uploadImage(file: Upload): Promise<UploadFileOutput> {
    const params = {
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: '',
      Body: '',
      ACL: 'public-read',
    };

    let { createReadStream, filename } = await file.promise;

    let fileStream = createReadStream();

    fileStream.on('error', (error) => console.error(error));

    params.Body = fileStream;

    let timestamp = new Date().getTime();

    let file_extension = extname(filename);

    params.Key = `images/${timestamp}${file_extension}`;

    let upload = promisify(this.s3.upload.bind(this.s3));

    let result = await upload(params).catch(console.log);

    let object = {
      id: filename,
      fileName: filename,
      url: result.Location,
    };

    return object;
  }
}
