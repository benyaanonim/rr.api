import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class PartyQueryRepo {
  constructor(protected readonly em: EntityManager) {}
}
