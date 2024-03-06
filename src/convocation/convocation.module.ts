import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convocation } from './domain/convocation.entity';
import { ConvocationService } from './convocation.service';
import { ConvocationRepo } from './infrastructure/convocation.repo';
import { ConvocationQueryRepo } from './infrastructure/convocation.query-repo';
import { ConvocationController } from './api/convocation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Convocation])],
  providers: [ConvocationService, ConvocationRepo, ConvocationQueryRepo],
  controllers: [ConvocationController],
})
export class ConvocationModule {}
