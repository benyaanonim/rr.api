import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Tag } from '../domain/tag.entity'

@Injectable()
export class TagRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(tagId: number) {
    return this.em.findOne(Tag, { where: { id: tagId } })
  }

  async save(tag: Tag) {
    return this.em.save(tag)
  }

  async delete(tagId: number) {
    return this.em.delete(Tag, { where: { id: tagId } })
  }
}
