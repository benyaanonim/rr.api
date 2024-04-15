import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Deputy } from '../domain/deputy.entity'
import { QueryFilterDeputy } from '../api/input/query-filter.deputy'
import { DeputyViewModel } from '../api/output/deputy.view-model'

@Injectable()
export class DeputyQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(id: number) {
    const deputy = await this.em.findOne(Deputy, {
      where: { id: id },
      relations: ['party', 'property', 'otherInfo', 'rating'],
    })
    return new DeputyViewModel(deputy)
  }

  async find(filter: QueryFilterDeputy) {
    const queryBuilder = this.em
      .createQueryBuilder(Deputy, 'deputy')
      .leftJoinAndSelect('deputy.party', 'party')
      .leftJoinAndSelect('deputy.property', 'property')
      .leftJoinAndSelect('deputy.otherInfo', 'otherInfo')
      .leftJoinAndSelect('deputy.rating', 'rating')

    if (filter.gender) {
      queryBuilder.andWhere('deputy.gender = :gender', { gender: filter.gender })
    }

    if (filter.partyName) {
      queryBuilder.andWhere('party.name = :partyName', { partyName: filter.partyName })
    }

    if (filter.majoritarian !== undefined) {
      queryBuilder.andWhere('deputy.majoritarian = :majoritarian', { majoritarian: filter.majoritarian })
    }

    const skip = (filter.page - 1) * filter.pageSize
    queryBuilder.skip(skip).take(filter.pageSize)

    const deputy = await queryBuilder.getMany()
    return deputy.map((d) => new DeputyViewModel(d))
  }
}
