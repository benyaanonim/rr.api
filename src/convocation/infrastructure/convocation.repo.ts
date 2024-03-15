import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Convocation } from '../domain/convocation.entity';

@Injectable()
export class ConvocationRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(id: number) {
    return this.em.findOne(Convocation, { where: { id: id } });
  }
  async save(convocation: Convocation) {
    return this.em.save(convocation);
  }

  async delete(id: number) {
    const isDeleted = await this.em.delete(Convocation, { where: { id: id } });
    if (!isDeleted.affected) {
      return null;
    }
    return isDeleted;
  }
}
