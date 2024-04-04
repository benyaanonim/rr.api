import { ApiProperty } from '@nestjs/swagger'

export class UpdateRatingInput {
  @ApiProperty({ description: 'attendance of a deputy at meetings of the Verkhovna Rada' })
  attendance: number | null

  @ApiProperty({ description: 'Deputy education rating' })
  education: number | null

  @ApiProperty({ description: 'Frequency of bill submissions' })
  feedFrequency: number | null

  @ApiProperty({ description: 'Corruption risks' })
  corruptionRisks: number | null

  @ApiProperty({ description: 'Experience in politics' })
  experienceInPolitics: number | null

  @ApiProperty({ description: 'Level of social approval' })
  socialReach: number | null

  @ApiProperty({ description: 'Assessment of deeds that have a positive impact on karma' })
  karmaMinus: number | null

  @ApiProperty({ description: 'Assessment of affairs that negatively affect karma' })
  karmaPlus: number | null
}
