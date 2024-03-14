import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from './domain/party.entity';
import { PartyService } from './party.service';
import { PartyQueryRepo } from './infrastructure/party.query-repo';
import { PartyRepo } from './infrastructure/party.repo';
import { PartyController } from './api/party.controller';
import { AwsService } from '../aws/aws.service';
import { ConvocationQueryRepo } from '../convocation/infrastructure/convocation.query-repo';

@Module({
  imports: [TypeOrmModule.forFeature([Party])],
  providers: [
    PartyService,
    PartyQueryRepo,
    PartyRepo,
    AwsService,
    ConvocationQueryRepo,
  ],
  controllers: [PartyController],
})
export class PartyModule {}
