import { Injectable } from '@nestjs/common'
import { ConvocationRepo } from './infrastructure/convocation.repo'
import { ConvocationCreateInput } from './api/input/convocation-create.input'
import { Convocation } from './domain/convocation.entity'
import { ConvocationUpdateInput } from './api/input/convocation-update.input'

@Injectable()
export class ConvocationService {
  constructor(protected readonly convocationRepo: ConvocationRepo) {}

  async convocationCreate(input: ConvocationCreateInput) {
    const convocation = new Convocation()
    convocation.name = input.name
    return this.convocationRepo.save(convocation)
  }

  async convocationUpdate(id: number, input: ConvocationUpdateInput) {
    const convocation = await this.convocationRepo.findOne(id)
    if (!convocation) {
      return null
    }
    convocation.name = input.name
    return this.convocationRepo.save(convocation)
  }

  async convocationDelete(id: number) {
    return this.convocationRepo.delete(id)
  }
}
