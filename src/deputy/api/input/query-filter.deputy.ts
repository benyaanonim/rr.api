import { Gender } from '../../domain/deputy.entity'

export class QueryFilterDeputy {
  gender?: Gender
  partyName?: string
  majoritarian?: boolean
  page: number = 1
  pageSize: number = 10
}
