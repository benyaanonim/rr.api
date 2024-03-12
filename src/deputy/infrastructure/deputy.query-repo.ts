import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Deputy } from '../domain/deputy.entity';

@Injectable()
export class DeputyQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async find() {
    return this.em.find(Deputy);
  }
}
