import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Deputy } from '../../deputy/domain/deputy.entity'
import { Like } from '../../like/domain/like.entity'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column({ default: 0 })
  likeCount: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Column({ nullable: true, name: 'parent_id' })
  parentId: number

  @Column({ name: 'deputy_id' })
  deputyId: number

  @ManyToOne(() => Comment, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Comment

  @ManyToOne(() => Deputy)
  @JoinColumn({ name: 'deputy_id' })
  deputy: Deputy
}
