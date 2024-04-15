import { Injectable } from '@nestjs/common'
import { EntityManager, In } from 'typeorm'
import { Tag } from '../domain/tag.entity'

@Injectable()
export class TagQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(id: number) {
    return this.em.findOne(Tag, { where: { id: id } })
  }

  async getTags() {
    return this.em.find(Tag)
  }

  async find(tagIds: number[]) {
    return this.em.find(Tag, { where: { id: In(tagIds) } })
  }
}
