import { Injectable } from '@nestjs/common'
import { EntityManager, In } from 'typeorm'
import { Deputy } from '../domain/deputy.entity'
import { OtherInfo } from '../domain/other-info.entity'
import { DeputyTag } from '../domain/deputy-tag.entity'

@Injectable()
export class DeputyRepo {
  constructor(protected readonly em: EntityManager) {}

  async findDeputyTags(ids: number[]) {
    return this.em.find(DeputyTag, { where: { id: In(ids) } })
  }

  async findOneDeputyTag(id: number) {
    return this.em.findOne(DeputyTag, { where: { id: id } })
  }

  async findOne(id: number) {
    return this.em.findOne(Deputy, {
      where: { id: id },
      relations: ['property', 'party', 'otherInfo', 'rating', 'deputyTag', 'place'],
    })
  }
  async save(entity: Deputy | OtherInfo | DeputyTag) {
    return this.em.save(entity)
  }

  async delete(id: number) {
    return this.em.delete(Deputy, id)
  }

  async deleteOtherInfo(id: number) {
    return this.em.delete(OtherInfo, id)
  }

  async deleteDeputyTag(id: number) {
    return this.em.delete(DeputyTag, id)
  }
}
