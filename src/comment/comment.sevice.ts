import { Injectable } from '@nestjs/common'
import { Comment } from './domain/comment.entity'
import { CreateCommentInput } from './api/input/create-comment.input'
import { UpdateCommentInput } from './api/input/update-comment.input'
import { DeputyRepo } from '../deputy/infrastructure/deputy.repo'
import { CommentRepo } from './infrastructure/comment.repo'

@Injectable()
export class CommentService {
  constructor(
    protected readonly commentRepository: CommentRepo,
    protected readonly deputyRepository: DeputyRepo,
  ) {}

  async create(input: CreateCommentInput): Promise<Comment> {
    const deputy = await this.deputyRepository.findOne(input.deputyId)
    if (!deputy) {
      return null
    }
    const comment = new Comment()
    comment.text = input.text
    comment.deputyId = input.deputyId
    comment.parentId = input.parentId ? input.parentId : null
    return await this.commentRepository.save(comment)
  }

  async update(id: number, input: UpdateCommentInput) {
    const comment = await this.commentRepository.findOne(id)
    if (!comment) {
      return null
    }
    comment.text = input.text
    return this.commentRepository.save(comment)
  }

  async delete(id: number) {
    try {
      const comment = await this.commentRepository.findOne(id)
      if (!comment) {
        return null
      }
      return await this.commentRepository.delete(id)
    } catch (err) {
      console.log(err)
    }
  }
}
