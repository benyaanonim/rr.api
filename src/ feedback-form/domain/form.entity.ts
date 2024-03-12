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

  @Column({ type: 'timestamp', name: 'created_at' })
  @ApiProperty({ description: 'Created at Date form' })
  createdAt: Date;

  @Column({ default: false })
  @ApiProperty({ description: 'Feedback form processing status' })
  status: boolean;

  @Column({ nullable: true, name: 'update_by' })
  @ApiProperty({
    description:
      'Name of the admin who updated the status of the feedback form',
  })
  updatedBy: string;

  @Column({ nullable: true, type: 'timestamp', name: 'updated_at' })
  @ApiProperty({
    description:
      'Date and time when the status of the feedback form was updated',
  })
  updatedAt: Date;
}
