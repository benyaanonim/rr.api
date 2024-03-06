import { Controller } from '@nestjs/common';
import { DeputyService } from '../deputy.service';
import { DeputyQueryRepo } from '../infrastructure/deputy.query-repo';

@Controller('deputy')
export class DeputyController {
  constructor(
    protected readonly deputyService: DeputyService,
    protected readonly deputyQueryRepo: DeputyQueryRepo,
  ) {}
}
