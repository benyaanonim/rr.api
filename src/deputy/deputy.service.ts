import { Injectable } from '@nestjs/common';
import { DeputyRepo } from './infrastructure/deputy.repo';

@Injectable()
export class DeputyService {
  constructor(protected readonly deputyRepo: DeputyRepo) {}
}
