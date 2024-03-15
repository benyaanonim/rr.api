import { Injectable } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { Convocation } from '../domain/convocation.entity';

@Injectable()
export class ConvocationQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(id: number) {
    return this.em.findOne(Convocation, {
      where: { id: id },
      relations: ['parties.deputies'],
    });
  }

  async findMany() {
    return this.em.find(Convocation);
  }

  async find(ids: number[]) {
    return this.em.find(Convocation, { where: { id: In(ids) } });
  }
}
