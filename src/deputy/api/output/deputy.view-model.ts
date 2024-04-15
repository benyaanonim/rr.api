import { ApiProperty } from '@nestjs/swagger'
import { Deputy, Gender } from '../../domain/deputy.entity'
import { Property } from '../../domain/deputy-property.entity'
import { Rating } from '../../domain/rating.entity'
import { OtherInfo } from '../../domain/other-info.entity'
import { Party } from '../../../party/domain/party.entity'

class PartyViewModel {
  @ApiProperty({ description: 'ID of the additional information entry' })
  id: number

  @ApiProperty({ description: 'Party name' })
  name: string

  @ApiProperty({ description: 'Party logo' })
  logo: string

  @ApiProperty({ description: 'Party background' })
  background: string

  constructor(party: Party) {
    this.id = party.id
    this.name = party.name
    this.logo = party.logo
    this.background = party.background
  }
}
export class OtherInfoViewModel {
  @ApiProperty({ description: 'ID of the additional information entry' })
  id: number

  @ApiProperty({ description: 'Name of the information entry' })
  name: string

  @ApiProperty({ description: 'Description of the information entry', type: [String] })
  description: string[]

  constructor(otherInfo: OtherInfo) {
    this.id = otherInfo.id
    this.name = otherInfo.name
    this.description = otherInfo.description
  }
}
export class PropertyViewModel {
  @ApiProperty({ description: 'ID of the property' })
  id: number

  @ApiProperty({ description: 'List of savings', type: [String] })
  savings: string[] | null

  @ApiProperty({ description: 'List of other assets', type: [String] })
  other: string[] | null

  @ApiProperty({ description: 'List of real estate properties', type: [String] })
  realEstate: string[] | null

  @ApiProperty({ description: 'List of cars', type: [String] })
  cars: string[] | null

  @ApiProperty({ description: 'List of business assets', type: [String] })
  business: string[] | null
  constructor(property: Property) {
    this.id = property.id
    this.savings = property.savings
    this.other = property.other
    this.realEstate = property.realEstate
    this.cars = property.cars
    this.business = property.business
  }
}

export class RatingViewModel {
  @ApiProperty({ description: 'ID of the rating' })
  id: number

  @ApiProperty({ description: 'Attendance score of the deputy' })
  attendance: number

  @ApiProperty({ description: 'Education score of the deputy' })
  education: number

  @ApiProperty({ description: 'Feed frequency score of the deputy' })
  feedFrequency: number

  @ApiProperty({ description: 'Corruption risks score of the deputy' })
  corruptionRisks: number

  @ApiProperty({ description: 'Experience in politics score of the deputy' })
  experienceInPolitics: number

  @ApiProperty({ description: 'Social reach score of the deputy' })
  socialReach: number

  @ApiProperty({ description: 'Karma minus score of the deputy' })
  karmaMinus: number

  @ApiProperty({ description: 'Karma plus score of the deputy' })
  karmaPlus: number

  constructor(rating: Rating) {
    this.id = rating.id
    this.attendance = rating.attendance
    this.education = rating.education
    this.feedFrequency = rating.feedFrequency
    this.corruptionRisks = rating.corruptionRisks
    this.experienceInPolitics = rating.experienceInPolitics
    this.socialReach = rating.socialReach
    this.karmaMinus = rating.karmaMinus
    this.karmaPlus = rating.karmaPlus
  }
}

export class DeputyViewModel {
  @ApiProperty({ description: 'ID of the deputy' })
  id: number

  @ApiProperty({ description: 'Method of election' })
  majoritarian: boolean

  @ApiProperty({ description: 'Name of the deputy' })
  name: string

  @ApiProperty({ description: 'Surname of the deputy' })
  surname: string

  @ApiProperty({ description: 'Patronymic of the deputy' })
  patronymic: string | null

  @ApiProperty({ description: 'Photo URL of the deputy' })
  photo: string | null

  @ApiProperty({ description: 'Background image URL of the deputy' })
  background: string | null

  @ApiProperty({ description: 'Birthday of the deputy', type: 'string', format: 'date' })
  birthday: string // Only the date part

  @ApiProperty({ description: 'Description of the deputy' })
  description: string

  @ApiProperty({ description: 'Gender of the deputy', enum: Gender })
  gender: Gender

  @ApiProperty({ description: 'Party associated with the deputy', type: PartyViewModel })
  party: PartyViewModel | null

  @ApiProperty({ description: 'Property associated with the deputy', type: PropertyViewModel })
  property: PropertyViewModel | null

  @ApiProperty({ description: 'Rating of the deputy', type: RatingViewModel })
  rating: RatingViewModel | null

  @ApiProperty({ description: 'Other information about the deputy', type: [OtherInfoViewModel] })
  otherInfo: OtherInfoViewModel[] | null
  constructor(deputy: Deputy) {
    this.id = deputy.id
    this.majoritarian = deputy.majoritarian
    this.name = deputy.name
    this.surname = deputy.surname
    this.patronymic = deputy.patronymic
    this.photo = deputy.photo
    this.background = deputy.background
    this.birthday = deputy.birthday.toISOString().split('T')[0]
    this.description = deputy.description
    this.gender = deputy.gender
    this.party = deputy.party ? new PartyViewModel(deputy.party) : null
    this.property = deputy.property ? new PropertyViewModel(deputy.property) : null
    this.rating = deputy.rating ? new RatingViewModel(deputy.rating) : null
    this.otherInfo = deputy.otherInfo ? deputy.otherInfo.map((info) => new OtherInfoViewModel(info)) : null
  }
}
