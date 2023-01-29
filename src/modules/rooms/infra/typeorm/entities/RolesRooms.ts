import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { RolesEnum } from '../enums/RolesEnum';

import User from '@modules/users/infra/typeorm/entities/User';
import Room from './Room';

@Entity('roles_rooms')
export default class RolesRooms {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Exclude()
  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  room_id: string;

  @Exclude()
  @OneToOne(() => Room, { eager: true })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column({ type: 'enum', enum: ["owner", "admin", "user"], default: "user"})
  role: RolesEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}