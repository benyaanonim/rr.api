import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as AWS from 'aws-sdk';
import { BufferedFile } from '../common/types/file.model';
import { FileUpload } from '../common/types/file.type';
import { stream2buffer } from '../helpers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  constructor(protected readonly configService: ConfigService) {
    AWS.config.update({ region: 'eu-north-1' });
  }

  private readonly bucketName = this.configService.get<string>('AWS_BUCKET');
  private readonly AccessKey = this.configService.get<string>('AWS_ACCESS');
  private readonly SecretKey = this.configService.get<string>('AWS_SECRET');
  private readonly s3: AWS.S3 = new AWS.S3({
    credentials: {
      accessKeyId: this.AccessKey,
      secretAccessKey: this.SecretKey,
    },
  });

  async uploadFile(file: FileUpload) {
    const { createReadStream, filename, encoding, mimetype } = file;
    return (await this.upload({
      fieldname: 'image',
      buffer: await stream2buffer(createReadStream()),
      mimetype,
      encoding,
      originalname: filename,
      size: 0,
    })) as string;
  }

  private async upload(file) {
    const { originalname } = file;
    return this.s3_upload(file, this.bucketName, originalname, file.mimetype);
  }

  private async s3_upload(
    file: BufferedFile,
    bucket,
    name,
    mimetype,
  ): Promise<string> {
    const timestamp = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const fileName = hashedFileName + extension;
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucket,
      Key: String(fileName),
      Body: file.buffer,
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    const s3Response = await this.s3.upload(params).promise();

    return s3Response.Location;
  }

  async deleteImage(fileName: string, bucketName: string = this.bucketName) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };
    this.s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log('Error deleting file:', err);
      } else {
        console.log('The file was successfully deleted:', data);
      }
    });
  }
}
