import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Convocation } from '../../convocation/domain/convocation.entity'
import { Deputy } from '../../deputy/domain/deputy.entity'

@Entity()
export class Party {
  @ApiProperty({ description: 'ID of the party' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ type: 'string', description: 'Name of the party' })
  @Column()
  name: string

  @ApiProperty({ description: 'Logo URL of the party' })
  @Column()
  logo: string

  @ApiProperty({ description: 'Background image URL of the party' })
  @Column()
  background: string

  @ApiProperty({ description: 'Description of the party' })
  @Column()
  description: string

  @ApiProperty({
    description: 'Convocations associated with the party',
    type: [Convocation],
  })
  @ManyToMany(() => Convocation, (convocation) => convocation.parties, {
    nullable: true,
  })
  @JoinTable()
  convocations: Convocation[] | null

  @ApiProperty({
    description: 'Deputies associated with the party',
    type: [Deputy],
  })
  @OneToMany(() => Deputy, (deputy) => deputy.party, { nullable: true })
  deputies: Deputy[] | null
}
