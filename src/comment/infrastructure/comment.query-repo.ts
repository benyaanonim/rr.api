import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Comment } from '../domain/comment.entity'
import { CommentViewModel } from '../api/output/comment.view.model'

@Injectable()
export class CommentQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async find(id: number) {
    const comments = await this.em.find(Comment, { where: { deputyId: id } })
    if (comments.length === 0) {
      return null
    }
    return comments.map((c) => new CommentViewModel(c))
  }
}
