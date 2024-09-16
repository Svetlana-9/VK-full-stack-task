import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  cat_id: string;

  @Column({ type: 'varchar' })
  created_at: string;

  @Column()
  user: number;
}
