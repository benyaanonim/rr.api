import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from './domain/party.entity';
import { PartyService } from './party.service';
import { PartyQueryRepo } from './infrastructure/party.query-repo';
import { PartyRepo } from './infrastructure/party.repo';
import { PartyController } from './api/party.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Party])],
  providers: [PartyService, PartyQueryRepo, PartyRepo],
  controllers: [PartyController],
})
export class PartyModule {}
