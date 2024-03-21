import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Party } from '../domain/party.entity'

@Injectable()
export class PartyRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(id: number) {
    return this.em.findOne(Party, { where: { id: id } })
  }
  async save(party: Party) {
    return this.em.save(party)
  }

  async delete(id: number) {
    return this.em.delete(Party, { where: { id: id } })
  }
}
