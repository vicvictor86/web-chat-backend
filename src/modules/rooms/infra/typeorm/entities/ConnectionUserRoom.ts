import User from '@modules/users/infra/typeorm/entities/User';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import Room from './Room';

@Entity('users_rooms')
export default class ConnectionUsersRooms {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Exclude()
  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'room_id' })
  roomId: string;

  @Exclude()
  @OneToOne(() => Room, { eager: true })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column({ name: 'socket_id' })
  socketId: string;

  @Column({ name: 'is_on_chat' })
  isOnChat: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}