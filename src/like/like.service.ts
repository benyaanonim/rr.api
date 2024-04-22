import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { LikeInputModel } from './api/like.input.model'
import { Like } from './domain/like.entity'
import { Comment } from '../comment/domain/comment.entity'

@Injectable()
export class LikeService {
  constructor(protected readonly em: EntityManager) {}

  async processLike(input: LikeInputModel, ip: string) {
    const commentExists = await this.em.findOne(Comment, { where: { id: input.commentId } })
    if (!commentExists) {
      return null
    }

    let like = await this.em.findOne(Like, { where: { commentId: input.commentId, ip: ip } })

    if (like) {
      if (like.status === input.status) {
        return like
      }
    } else {
      like = new Like()
      like.commentId = input.commentId
      like.ip = ip
    }

    like.status = input.status
    await this.em.save(like)

    if (like.status) {
      await this.em.increment(Comment, { id: input.commentId }, 'likeCount', 1)
    } else {
      await this.em.decrement(Comment, { id: input.commentId }, 'likeCount', 1)
    }

    return like
  }
}
