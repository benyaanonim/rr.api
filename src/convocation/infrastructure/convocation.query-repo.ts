import { Injectable } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { Convocation } from '../domain/convocation.entity';

@Injectable()
export class ConvocationQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async find(ids: number[]) {
    return this.em.find(Convocation, { where: { id: In(ids) } });
  }
}
