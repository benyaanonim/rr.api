import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
import * as AWS from 'aws-sdk'
import { ConfigService } from '@nestjs/config'
import { Readable } from 'stream'
import { extractFileName } from '../helpers'

@Injectable()
export class AwsService {
  private readonly s3: AWS.S3
  private readonly bucketName: string

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>('AWS_BUCKET')
    this.s3 = new AWS.S3({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET'),
      },
    })
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const readStream = this.bufferToStream(file.buffer)
      const fileName = this.generateFileName(file.originalname)
      return this.uploadToS3(readStream, fileName, file.mimetype)
    } catch (err) {
      console.log(err)
    }
  }

  private bufferToStream(buffer: Buffer): Readable {
    const stream = new Readable()
    stream.push(buffer)
    stream.push(null)
    return stream
  }

  private generateFileName(originalName: string): string {
    try {
      const timestamp = new Date().toString()
      const hashedFileName = crypto.createHash('md5').update(timestamp).digest('hex')
      const extensionIndex = originalName.lastIndexOf('.')
      const extension = extensionIndex !== -1 ? originalName.substring(extensionIndex) : ''
      return `${hashedFileName}${extension}`
    } catch (err) {
      console.log(err)
    }
  }

  private async uploadToS3(stream: Readable, fileName: string, mimetype: string): Promise<string> {
    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: this.bucketName,
        Key: fileName,
        Body: stream,
        ContentType: mimetype,
        ContentDisposition: 'inline',
      }

      const { Location } = await this.s3.upload(params).promise()
      return Location
    } catch (err) {
      console.log(err)
    }
  }

  async deleteImage(image: string): Promise<void> {
    const fileName = extractFileName(image)
    console.log(fileName)
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
    }

    try {
      await this.s3.deleteObject(params).promise()
      console.log('The file was successfully deleted')
    } catch (err) {
      console.error('Error deleting file:', err)
    }
  }
}
