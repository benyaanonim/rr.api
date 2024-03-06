import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  male,
  female,
}

@Entity()
export class Deputy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  photo: string;

  @Column({ type: 'timestamp' })
  birthday: Date;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  convocation: string;

  @Column()
  party: string;
}
