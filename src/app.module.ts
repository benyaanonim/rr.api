import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { AwsModule } from './aws/aws.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('PG_URI'),
        // host: configService.get<string>('PG_HOST') || 'localhost',
        // port: configService.get<number>('PG_PORT', 5432),
        // username: configService.get<string>('USER_NAME_DB'),
        // password: configService.get<string>('PASSWORD_DB'),
        // database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
            sslmode: 'require',
          },
        },
      }),
      inject: [ConfigService],
    }),
    NewsModule,
    AwsModule,
    TagModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
