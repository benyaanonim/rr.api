import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class ConvocationRepo {
  constructor(protected readonly em: EntityManager) {}
}
