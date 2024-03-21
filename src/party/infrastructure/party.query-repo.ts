import { Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Party } from '../domain/party.entity'

@Injectable()
export class PartyQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(id: number) {
    return this.em.findOne(Party, {
      where: { id: id },
      relations: ['deputies'],
    })
  }

  async find() {
    return this.em.find(Party, { relations: ['deputies'] })
  }
}
