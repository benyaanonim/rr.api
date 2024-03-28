import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { DeputyRepo } from './infrastructure/deputy.repo'
import { CreateDeputyInput } from './api/input/create-deputy.input'
import { Deputy, Property } from './domain/deputy.entity'
import { AwsService } from '../aws/aws.service'
import { PartyQueryRepo } from '../party/infrastructure/party.query-repo'
import { UpdateDeputyInput } from './api/input/update-deputy.input'

@Injectable()
export class DeputyService {
  constructor(
    protected readonly deputyRepo: DeputyRepo,
    protected readonly aws: AwsService,
    protected readonly pqr: PartyQueryRepo,
  ) {}

  async createDeputy(input: CreateDeputyInput) {
    const photo = input.photo ? await this.aws.uploadFile(await input.photo) : null
    const background = input.background ? await this.aws.uploadFile(await input.background) : null

    const property = new Property()
    property.savings = input.savings
    property.other = input.other
    property.realEstate = input.realEstate
    property.cars = input.cars
    property.business = input.business

    const deputy = new Deputy()
    deputy.name = input.name
    deputy.surname = input.surname
    deputy.birthday = input.birthday
    deputy.description = input.description
    deputy.gender = input.gender
    deputy.photo = photo
    deputy.background = background
    deputy.party = await this.pqr.findOne(input.partyId)
    deputy.property = property

    return this.deputyRepo.save(deputy)
  }

  async updateDeputy(input: UpdateDeputyInput, id: number) {
    const deputy = await this.deputyRepo.findOne(id)
    if (!deputy) {
      return null
    }

    if (input.photo) {
      if (deputy.photo) {
        await this.aws.deleteImage(deputy.photo)
      }
      deputy.photo = await this.aws.uploadFile(await input.photo)
    }

    if (input.background) {
      if (deputy.background) {
        await this.aws.deleteImage(deputy.background)
      }
      deputy.background = await this.aws.uploadFile(await input.background)
    }

    deputy.property.savings = input.savings ?? deputy.property.savings
    deputy.property.other = input.other ?? deputy.property.other
    deputy.property.realEstate = input.realEstate ?? deputy.property.realEstate
    deputy.property.cars = input.cars ?? deputy.property.cars
    deputy.property.business = input.business ?? deputy.property.business

    deputy.name = input.name ?? deputy.name
    deputy.surname = input.surname ?? deputy.surname
    deputy.birthday = input.birthday ?? deputy.birthday
    deputy.description = input.description ?? deputy.description
    deputy.gender = input.gender ?? deputy.gender
    deputy.party = input.partyId ? await this.pqr.findOne(input.partyId) : deputy.party

    return this.deputyRepo.save(deputy)
  }

  async deleteDeputy(id: number) {
    const deputy = await this.deputyRepo.findOne(id)
    if (!deputy) {
      return null
    }
    try {
      if (deputy.photo) {
        await this.aws.deleteImage(deputy.photo)
      }
      if (deputy.background) {
        await this.aws.deleteImage(deputy.background)
      }
      await this.deputyRepo.delete(id)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(`Failed to delete deputy with ID: ${id}`)
    }

    return deputy
  }
}
