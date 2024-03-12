import { Controller } from '@nestjs/common';
import { PartyService } from '../party.service';
import { PartyQueryRepo } from '../infrastructure/party.query-repo';

@Controller('party')
export class PartyController {
  constructor(
    protected readonly partyService: PartyService,
    protected readonly partyQueryRepo: PartyQueryRepo,
  ) {}
}
