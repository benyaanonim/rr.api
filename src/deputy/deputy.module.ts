import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DeputyService } from './deputy.service'
import { DeputyRepo } from './infrastructure/deputy.repo'
import { DeputyQueryRepo } from './infrastructure/deputy.query-repo'
import { DeputyController } from './api/deputy.controller'
import { Deputy, Property } from './domain/deputy.entity'
import { AwsService } from '../aws/aws.service'
import { PartyQueryRepo } from '../party/infrastructure/party.query-repo'
import { ConvocationQueryRepo } from '../convocation/infrastructure/convocation.query-repo'

@Module({
  imports: [TypeOrmModule.forFeature([Deputy, Property])],
  providers: [DeputyService, DeputyRepo, DeputyQueryRepo, AwsService, PartyQueryRepo, ConvocationQueryRepo],
  controllers: [DeputyController],
})
export class DeputyModule {}
