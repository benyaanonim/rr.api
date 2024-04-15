import { Gender } from '../../domain/deputy.entity'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class QueryFilterDeputy {
  @ApiPropertyOptional({ enum: Gender, description: 'Gender of the deputy' })
  gender?: Gender

  @ApiPropertyOptional({ description: 'Name of the party' })
  partyName?: string

  @ApiPropertyOptional({ description: 'Method of election (true for majoritarian, false for proportional)' })
  majoritarian?: boolean

  @ApiPropertyOptional({ description: 'Page number for pagination', default: 1 })
  page: number = 1

  @ApiPropertyOptional({ description: 'Number of items per page for pagination', default: 10 })
  pageSize: number = 10
}
