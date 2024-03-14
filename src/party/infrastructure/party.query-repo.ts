import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Party } from '../domain/party.entity';

@Injectable()
export class PartyQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(id: number) {
    return this.em.findOneOrFail(Party, { where: { id: id } });
  }

  async find() {
    return this.em.find(Party);
  }
}
