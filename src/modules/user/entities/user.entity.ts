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
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    // transformer: {
    //   from: (value) => value,
    //   to: (value) => value * 1000,
    // },
    transformer: {
      from: (value) => +value,
      to: (value) => value,
    },
    // transformer: {
    //   to: (value: number) => new Date(value / 1000), // Convert milliseconds to Date
    //   from: (value: Date) => value.getTime(), // Convert Date to milliseconds
    // },
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    // transformer: {
    //   from: (value) => value * 1000,
    //   to: (value) => value,
    // },
    transformer: {
      from: (value) => {
        console.log('from', value);
        return +value;
      },
      to: (value) => {
        console.log('to', value);

        if (value) {
          const timestamp = new Date(value).toISOString(); // Convert to ISO string (timestamp format)
          console.log('converted to timestamp:', timestamp);

          return timestamp;
        }

        return value;
      },
      // to: (value) => new Date(value.toString()),
    },
    // transformer: {
    //   to: (value: number) => new Date(value / 1000), // Convert milliseconds to Date
    //   from: (value: Date) => value.getTime(), // Convert Date to milliseconds
    // },
  })
  updatedAt: number;
}
