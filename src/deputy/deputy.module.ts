import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DeputyService } from './deputy.service'
import { DeputyRepo } from './infrastructure/deputy.repo'
import { DeputyQueryRepo } from './infrastructure/deputy.query-repo'
import { DeputyController } from './api/deputy.controller'
import { Deputy } from './domain/deputy.entity'
import { AwsService } from '../aws/aws.service'
import { PartyQueryRepo } from '../party/infrastructure/party.query-repo'
import { ConvocationQueryRepo } from '../convocation/infrastructure/convocation.query-repo'
import { Property } from './domain/deputy-property.entity'
import { OtherInfo } from './domain/other-info.entity'
import { Rating } from './domain/rating.entity'
import { DeputyTag } from './domain/deputy-tag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Deputy, Property, OtherInfo, Rating, DeputyTag])],
  providers: [DeputyService, DeputyRepo, DeputyQueryRepo, AwsService, PartyQueryRepo, ConvocationQueryRepo],
  controllers: [DeputyController],
})
export class DeputyModule {}
