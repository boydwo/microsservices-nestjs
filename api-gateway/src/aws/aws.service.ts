import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AwsService {
  private logger = new Logger(AwsService.name);

  constructor(private configService: ConfigService) {}
  public async uploadArquivo(file: any, id: string) {
    const AWS_DATA = {
      region: this.configService.get<string>('AWS_REGION_NAME'),
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    };

    const s3 = new AWS.S3(AWS_DATA);

    const fileExtension = file.originalname.split('.')[1];

    const urlKey = `${id}.${fileExtension}`;
    this.logger.log(`urlKey: ${urlKey}`);
    console.log(AWS_DATA);
    const params = {
      Body: file.buffer,
      Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
      Key: urlKey,
    };

    const data = s3
      .putObject(params)
      .promise()
      .then(
        (data) => {
          return {
            //https://{NomeBucket}.s3-{region}.amazonaws.com/{NomeArquivo}
            url: `https://${params.Bucket}.s3.${AWS_DATA.region}.amazonaws.com/${urlKey}`,
          };
        },
        (err) => {
          this.logger.error(err);
          return err;
        },
      );

    return data;
  }
}
