import { Controller } from '@nestjs/common';
import { ConvocationService } from '../convocation.service';
import { ConvocationQueryRepo } from '../infrastructure/convocation.query-repo';

@Controller('convocation')
export class ConvocationController {
  constructor(
    protected readonly convocationService: ConvocationService,
    protected readonly convocationQueryRepo: ConvocationQueryRepo,
  ) {}
}
