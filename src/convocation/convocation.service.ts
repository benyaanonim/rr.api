import { Injectable } from '@nestjs/common';
import { ConvocationRepo } from './infrastructure/convocation.repo';

@Injectable()
export class ConvocationService {
  constructor(protected readonly convocationRepo: ConvocationRepo) {}
}
