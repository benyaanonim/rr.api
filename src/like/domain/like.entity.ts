import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  ip: string

  @Column()
  status: boolean

  @Column({ name: 'comment_id' })
  commentId: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string
}
