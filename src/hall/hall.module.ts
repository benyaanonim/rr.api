import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HallController } from './api/hall.controller'
import { Place } from './domain/place.entity'
import { Hall } from './domain/hall.entity'
import { HallService } from './hall.service'
import { HallQueryRepo } from './infrastructure/hall.query-repo'

@Module({
  imports: [TypeOrmModule.forFeature([Hall, Place])],
  controllers: [HallController],
  providers: [HallService, HallQueryRepo],
})
export class HallModule {}
