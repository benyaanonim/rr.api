import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Convocation {
  @PrimaryGeneratedColumn()
  id: number;
}
