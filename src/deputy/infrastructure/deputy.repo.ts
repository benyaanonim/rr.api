import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class DeputyRepo {
  constructor(protected readonly em: EntityManager) {}
}
