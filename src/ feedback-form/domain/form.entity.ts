import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Unique identifier of the form',
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Name of the person who submitted the form',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Email address of the person who submitted the form',
  })
  email: string;

  @Column()
  @ApiProperty({
    description: 'Text content of the form',
  })
  text: string;
}
