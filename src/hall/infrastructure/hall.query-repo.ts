import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Hall } from '../domain/hall.entity'
import { HallViewModel } from '../api/output/hall.view.model'

@Injectable()
export class HallQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async findAll() {
    const halls = await this.em.find(Hall, {
      relations: [
        'places',
        'places.deputy',
        'places.deputy.party',
        'places.deputy.property',
        'places.deputy.rating',
        'places.deputy.otherInfo',
        'places.deputy.deputyTag',
      ],
      order: {
        id: 'ASC',
        places: {
          id: 'ASC',
        },
      },
    })
    return halls.map((h) => new HallViewModel(h))
  }
  async findOne(id: number) {
    const hall = await this.em.findOne(Hall, {
      where: { id: id },
      relations: [
        'places',
        'places.deputy',
        'places.deputy.party',
        'places.deputy.property',
        'places.deputy.rating',
        'places.deputy.otherInfo',
        'places.deputy.deputyTag',
      ],
    })
    if (!hall) {
      return null
    }
    return new HallViewModel(hall)
  }
}
