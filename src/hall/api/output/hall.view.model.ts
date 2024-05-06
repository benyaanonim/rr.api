import { Hall } from '../../domain/hall.entity'
import { Place } from '../../domain/place.entity'
import { DeputyViewModel } from '../../../deputy/api/output/deputy.view-model'
import { ApiProperty } from '@nestjs/swagger'

export class PlaceViewModel {
  @ApiProperty({ description: 'ID of the place', example: 1 })
  id: number

  @ApiProperty({ description: 'Number of the place within the hall', example: 101 })
  placeNumber: number

  @ApiProperty({ description: 'Assigned deputy, if any', type: DeputyViewModel, nullable: true })
  deputy: DeputyViewModel
  constructor(place: Place) {
    this.id = place.id
    this.placeNumber = place.placeNumber
    this.deputy = place.deputy ? new DeputyViewModel(place.deputy) : null
  }
}
export class HallViewModel {
  @ApiProperty({ description: 'ID of the hall', example: 1 })
  id: number

  @ApiProperty({ description: 'Name of the hall', example: 'Main Hall' })
  name: string

  @ApiProperty({ description: 'Number of places in the hall', example: 150 })
  numberOfPlaces: number

  @ApiProperty({ description: 'List of places in the hall', type: [PlaceViewModel], nullable: true })
  places: PlaceViewModel[]

  constructor(hall: Hall) {
    this.id = hall.id
    this.name = hall.name
    this.numberOfPlaces = hall.numberOfPlaces
    this.places = hall.places ? hall.places.map((p) => new PlaceViewModel(p)) : null
  }
}
