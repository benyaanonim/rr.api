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
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { FormModule } from './ feedback-form/form.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DeputyModule } from './deputy/deputy.module';
import { PartyModule } from './party/party.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConvocationModule } from './convocation/convocation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot({
      ttl: 900,
      limit: 15,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    // MulterModule.register({
    //   limits: {
    //     files: 10,
    //     fileSize: 1024 * 1024 * 10,
    //   },
    // }),
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
    AuthModule,
    NewsModule,
    AwsModule,
    TagModule,
    CategoryModule,
    AdminModule,
    FormModule,
    DeputyModule,
    PartyModule,
    ConvocationModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
