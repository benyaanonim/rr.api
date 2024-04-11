import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { PartyRepo } from './infrastructure/party.repo'
import { PartyCreateInput } from './api/input/party-create.input'
import { AwsService } from '../aws/aws.service'
import { Party } from './domain/party.entity'
import { ConvocationQueryRepo } from '../convocation/infrastructure/convocation.query-repo'
import { PartyUpdateInput } from './api/input/party-update.input'

@Injectable()
export class PartyService {
  constructor(
    protected readonly partyRepo: PartyRepo,
    protected readonly aws: AwsService,
    protected readonly cqr: ConvocationQueryRepo,
  ) {}

  async createParty(input: PartyCreateInput) {
    const logo = input.logo ? await this.aws.uploadFile(await input.logo[0]) : null
    const background = input.background ? await this.aws.uploadFile(await input.background[0]) : null

    const party = new Party()
    party.convocations = await this.cqr.find(input.convocationIds)
    party.logo = logo
    party.background = background
    party.name = input.name
    party.description = input.description

    return this.partyRepo.save(party)
  }

  async updateParty(id: number, input: PartyUpdateInput) {
    const party = await this.partyRepo.findOne(id)
    if (!party) {
      throw new NotFoundException(`Party with ID: ${id} not found`)
    }
    if (input.logo) {
      if (party.logo) {
        await this.aws.deleteImage(party.logo)
      }
      party.logo = await this.aws.uploadFile(await input.logo)
    }

    if (input.background) {
      if (party.background) {
        await this.aws.deleteImage(party.background)
      }
      party.background = await this.aws.uploadFile(await input.background)
    }

    party.description = input.description ?? party.description
    party.name = input.name ?? party.name
    party.convocations = (await this.cqr.find(input.convocationIds)) ?? party.convocations

    return this.partyRepo.save(party)
  }

  async deleteParty(id: number) {
    const party = await this.partyRepo.findOne(id)
    if (!party) {
      throw new NotFoundException(`Party with ID: ${id} not found`)
    }
    try {
      await this.aws.deleteImage(party.logo)
      await this.aws.deleteImage(party.background)
      await this.partyRepo.delete(id)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(`Failed to delete party with ID: ${id}`)
    }
  }
}
