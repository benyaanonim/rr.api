import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Party } from '../../party/domain/party.entity';
import { Deputy } from '../../deputy/domain/deputy.entity';

@Entity()
export class Convocation {
  @ApiProperty({ description: 'ID of the convocation' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Name of the convocation' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Parties associated with the convocation',
    type: [Party],
  })
  @ManyToMany(() => Party, (party) => party.convocations)
  parties: Party[];

  @ApiProperty({
    description: 'Deputies associated with the convocation',
    type: [Deputy],
  })
  @ManyToMany(() => Deputy, (deputy) => deputy.convocations)
  deputies: Deputy[];
}
