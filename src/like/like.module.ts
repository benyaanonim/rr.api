import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Like } from './domain/like.entity'
import { LikeService } from './like.service'
import { LikeController } from './api/like.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
