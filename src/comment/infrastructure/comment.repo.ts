import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Comment } from '../domain/comment.entity'

@Injectable()
export class CommentRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(id: number) {
    return this.em.findOne(Comment, { where: { id: id } })
  }

  async save(comment: Comment) {
    return this.em.save(Comment, comment)
  }

  async delete(id: number) {
    return this.em.delete(Comment, id)
  }
}
