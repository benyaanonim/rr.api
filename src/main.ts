import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT', 3000);
  app.enableCors();
  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 9 }));

  await app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`);
  });
}
bootstrap();
