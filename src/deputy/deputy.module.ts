import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeputyService } from './deputy.service';
import { DeputyRepo } from './infrastructure/deputy.repo';
import { DeputyQueryRepo } from './infrastructure/deputy.query-repo';
import { DeputyController } from './api/deputy.controller';
import { Deputy } from './domain/deputy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deputy])],
  providers: [DeputyService, DeputyRepo, DeputyQueryRepo],
  controllers: [DeputyController],
})
export class DeputyModule {}
