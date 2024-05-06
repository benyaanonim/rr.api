import { Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { HallCreateInput } from './api/input/hall.create.input'
import { Hall } from './domain/hall.entity'
import { Place } from './domain/place.entity'
import { Deputy } from '../deputy/domain/deputy.entity'

@Injectable()
export class HallService {
  constructor(protected readonly em: EntityManager) {}

  async createHall(input: HallCreateInput) {
    const hall = new Hall()
    hall.name = input.name
    hall.numberOfPlaces = input.numberOfPlaces

    const savedHall = await this.em.save(hall)

    for (let i = 0; i < input.numberOfPlaces; i++) {
      const place = new Place()
      place.placeNumber = i + 1
      place.hall = savedHall
      await this.em.save(place)
    }
    return savedHall
  }

  async seatToDeputy(hallId: number, placeId: number, deputyId: number) {
    const hall = await this.em.findOne(Hall, { where: { id: hallId } })
    if (!hall) {
      return null
    }
    const place = await this.em.findOne(Place, { where: { id: placeId, hall: hall } })
    if (!place) {
      throw new NotFoundException(`Place with ID ${placeId} not found in hall with ID ${hallId}`)
    }

    const deputy = await this.em.findOne(Deputy, { where: { id: deputyId } })
    if (!deputy) {
      throw new NotFoundException(`Deputy with ID ${deputyId} not found`)
    }
    place.deputy = deputy
    return this.em.save(place)
  }

  async removeDeputy(hallId: number, placeId: number, deputyId: number) {
    const hall = await this.em.findOne(Hall, { where: { id: hallId } })
    if (!hall) {
      return null
    }
    const place = await this.em.findOne(Place, { where: { id: placeId, hall: hall } })
    if (!place) {
      throw new NotFoundException(`Place with ID ${placeId} not found in hall with ID ${hallId}`)
    }

    const deputy = await this.em.findOne(Deputy, { where: { id: deputyId } })
    if (!deputy) {
      throw new NotFoundException(`Deputy with ID ${deputyId} not found`)
    }

    place.deputy = null
    return await this.em.save(place)
  }

  async deleteHall(hallId: number) {
    const places = await this.em.find(Place, { where: { hall: { id: hallId } } })
    await this.em.remove(places)
    await this.em.delete(Hall, { id: hallId })
  }
}
