import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class ConvocationQueryRepo {
  constructor(protected readonly em: EntityManager) {}
}
