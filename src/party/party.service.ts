import { Injectable } from '@nestjs/common';
import { PartyRepo } from './infrastructure/party.repo';

@Injectable()
export class PartyService {
  constructor(protected readonly partyRepo: PartyRepo) {}
}
