import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Deputy } from '../domain/deputy.entity'

@Injectable()
export class DeputyRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(id: number) {
    return this.em.findOne(Deputy, { where: { id: id } })
  }
  async save(deputy: Deputy) {
    return this.em.save(deputy)
  }

  async delete(id: number) {
    return this.em.delete(Deputy, id)
  }
}
