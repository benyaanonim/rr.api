import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class DeputyQueryRepo {
  constructor(protected readonly em: EntityManager) {}
}
