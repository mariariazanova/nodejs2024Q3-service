import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn({ default: 1 })
  version: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    // transformer: {
    //   from: (value) => value,
    //   to: (value) => value * 1000,
    // },
    transformer: {
      from: (value) => +value,
      to: (value) => value,
    },
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    // transformer: {
    //   from: (value) => value * 1000,
    //   to: (value) => value,
    // },
    transformer: {
      from: (value) => +value,
      to: (value) => value,
    },
  })
  updatedAt: number;
}
