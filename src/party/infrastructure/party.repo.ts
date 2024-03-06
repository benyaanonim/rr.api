import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class PartyRepo {
  constructor(protected readonly em: EntityManager) {}
}
