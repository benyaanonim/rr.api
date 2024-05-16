import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { DeputyRepo } from './infrastructure/deputy.repo'
import { CreateDeputyInput } from './api/input/create-deputy.input'
import { Deputy } from './domain/deputy.entity'
import { AwsService } from '../aws/aws.service'
import { PartyQueryRepo } from '../party/infrastructure/party.query-repo'
import { UpdateDeputyInput } from './api/input/update-deputy.input'
import { Property } from './domain/deputy-property.entity'
import { CreateOtherInfoInput } from './api/input/create.other-info.input'
import { OtherInfo } from './domain/other-info.entity'
import { Rating } from './domain/rating.entity'
import { UpdateRatingInput } from './api/input/update.rating'
import { CreateDeputyTag } from './api/input/create.deputy-tag'
import { DeputyTag } from './domain/deputy-tag.entity'
import SocialBlade, { YouTubeUser } from 'socialblade'
import SocialBladeUser from 'socialblade'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class DeputyService {
  constructor(
    protected readonly deputyRepo: DeputyRepo,
    protected readonly aws: AwsService,
    protected readonly pqr: PartyQueryRepo,
    protected readonly config: ConfigService,
  ) {}

  async updateDeputyImage(id: number, photo?: Express.Multer.File[], background?: Express.Multer.File) {
    try {
      const deputy = await this.deputyRepo.findOne(id)
      if (!deputy) {
        return null
      }

      if (photo) {
        const uploadPromises = photo.map((photo) => this.aws.uploadFile(photo))
        deputy.photo = await Promise.all(uploadPromises)
      }

      deputy.background = background ? await this.aws.uploadFile(background[0]) : deputy.background
      return this.deputyRepo.save(deputy)
    } catch (err) {
      console.log(err)
    }
  }

  async createDeputy(input: CreateDeputyInput) {
    try {
      const rating = new Rating()
      rating.attendance = 0
      rating.corruptionRisks = 0
      rating.education = 0
      rating.experienceInPolitics = 0
      rating.feedFrequency = 0
      rating.socialReach = 0
      rating.karmaMinus = 0
      rating.karmaPlus = 0

      const property = new Property()
      property.savings = input.savings || null
      property.other = input.other || null
      property.realEstate = input.realEstate || null
      property.cars = input.cars || null
      property.business = input.business || null

      const deputy = new Deputy()
      deputy.name = input.name
      deputy.surname = input.surname
      deputy.patronymic = input.patronymic
      deputy.jobTitle = input.jobTitle
      deputy.stateLevel = input.stateLevel
      deputy.birthday = input.birthday
      deputy.description = input.description
      deputy.gender = input.gender
      deputy.party = await this.pqr.findOne(input.partyId)
      deputy.property = property
      deputy.deputyTag = null
      deputy.majoritarian = input.majoritarian
      deputy.rating = rating

      return this.deputyRepo.save(deputy)
    } catch (err) {
      console.error(err.message)
      console.log(err)
    }
  }

  async updateDeputy(input: UpdateDeputyInput, id: number) {
    try {
      const deputy = await this.deputyRepo.findOne(id)
      if (!deputy) {
        return null
      }

      deputy.property.savings = input.savings ?? deputy.property.savings
      deputy.property.other = input.other ?? deputy.property.other
      deputy.property.realEstate = input.realEstate ?? deputy.property.realEstate
      deputy.property.cars = input.cars ?? deputy.property.cars
      deputy.property.business = input.business ?? deputy.property.business

      deputy.name = input.name ?? deputy.name
      deputy.surname = input.surname ?? deputy.surname
      deputy.patronymic = input.patronymic ?? deputy.patronymic
      deputy.stateLevel = input.stateLevel ?? deputy.stateLevel
      deputy.birthday = input.birthday ? input.birthday : deputy.birthday
      deputy.jobTitle = input.jobTitle ?? deputy.jobTitle
      deputy.description = input.description ?? deputy.description
      deputy.gender = input.gender ?? deputy.gender
      deputy.majoritarian = input.majoritarian ?? deputy.majoritarian
      deputy.party = input.partyId ? await this.pqr.findOne(input.partyId) : deputy.party

      if (input.deputyTagIds.length > 0) {
        deputy.deputyTag = await this.deputyRepo.findDeputyTags(input.deputyTagIds)
      }

      return this.deputyRepo.save(deputy)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(`Failed to update deputy`)
    }
  }

  async deleteDeputy(id: number) {
    const deputy = await this.deputyRepo.findOne(id)
    if (!deputy) {
      return null
    }
    try {
      // if (deputy.photo) {
      //   await this.aws.deleteImage(deputy.photo.map())
      // }
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

  async createOtherInfo(id: number, input: CreateOtherInfoInput) {
    const deputy = await this.deputyRepo.findOne(id)
    if (!deputy) {
      return null
    }

    const otherInfo = new OtherInfo()
    otherInfo.name = input.name
    otherInfo.description = input.description
    otherInfo.deputy = deputy

    return this.deputyRepo.save(otherInfo)
  }

  async deleteOtherInfo(deputyId: number, id: number) {
    const deputy = await this.deputyRepo.findOne(deputyId)
    if (!deputy) {
      return null
    }
    return this.deputyRepo.deleteOtherInfo(id)
  }

  async updateRating(id: number, input: UpdateRatingInput) {
    const deputy = await this.deputyRepo.findOne(id)

    if (!deputy) {
      return null
    }

    deputy.rating.attendance = input.attendance ?? deputy.rating.attendance
    deputy.rating.socialReach = input.socialReach ?? deputy.rating.socialReach
    deputy.rating.experienceInPolitics = input.experienceInPolitics ?? deputy.rating.experienceInPolitics
    deputy.rating.education = input.education ?? deputy.rating.education
    deputy.rating.corruptionRisks = input.corruptionRisks ?? deputy.rating.corruptionRisks
    deputy.rating.feedFrequency = input.feedFrequency ?? deputy.rating.feedFrequency
    deputy.rating.karmaPlus = input.karmaPlus ?? deputy.rating.karmaPlus
    deputy.rating.karmaMinus = input.karmaMinus ?? deputy.rating.karmaMinus

    return this.deputyRepo.save(deputy)
  }

  async createDeputyTag(input: CreateDeputyTag) {
    try {
      const deputyTag = new DeputyTag()
      deputyTag.name = input.name
      deputyTag.descriptions = input.description
      return this.deputyRepo.save(deputyTag)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(`Failed to create deputy tag`)
    }
  }

  async deleteDeputyTag(id: number) {
    try {
      const deputyTag = await this.deputyRepo.findOneDeputyTag(id)
      if (!deputyTag) {
        return null
      }
      return this.deputyRepo.deleteDeputyTag(id)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(`Failed to delete deputy tag`)
    }
  }

  async getSocialBladeData(name: string) {
    const SOCIALBLADE_CLIENT_ID = this.config.get<string>('SOCIALBLADE_CLIENT_ID')
    const SOCIALBLADE_ACCESS_TOKEN = this.config.get<string>('SOCIALBLADE_ACCESS_TOKEN')
    const client: SocialBlade = new SocialBlade(SOCIALBLADE_CLIENT_ID, SOCIALBLADE_ACCESS_TOKEN)
    try {
      const facebook = await client.facebook.user(name)
      const twitter = await client.twitter.user(name)
      const instagram = await client.instagram.user(name)
      // const telegramUser = await client.??.user(name)
      console.log(facebook)
      return {
        facebook: facebook,
        instagram: twitter,
        twitter: instagram,
      }
    } catch (error) {
      console.error('Error fetching social media data:', error)
      throw error
    }
  }
}
