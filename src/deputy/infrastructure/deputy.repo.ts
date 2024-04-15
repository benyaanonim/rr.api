import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Deputy } from '../domain/deputy.entity'
import { OtherInfo } from '../domain/other-info.entity'

@Injectable()
export class DeputyRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(id: number) {
    return this.em.findOne(Deputy, {
      where: { id: id },
      relations: ['property', 'party', 'otherInfo', 'rating'],
    })
  }
  async save(entity: Deputy | OtherInfo) {
    console.log(entity)
    return this.em.save(entity)
  }

  async delete(id: number) {
    return this.em.delete(Deputy, id)
  }

  async deleteOtherInfo(id: number) {
    return this.em.delete(OtherInfo, id)
  }
}
