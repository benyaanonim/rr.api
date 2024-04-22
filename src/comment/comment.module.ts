import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentController } from './api/comment.controller'
import { CommentService } from './comment.sevice'
import { CommentRepo } from './infrastructure/comment.repo'
import { CommentQueryRepo } from './infrastructure/comment.query-repo'
import { Comment } from './domain/comment.entity'
import { DeputyRepo } from '../deputy/infrastructure/deputy.repo'

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepo, CommentQueryRepo, DeputyRepo],
})
export class CommentModule {}
