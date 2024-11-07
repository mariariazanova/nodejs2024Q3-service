import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;
}
