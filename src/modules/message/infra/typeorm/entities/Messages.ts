import Room from '@modules/rooms/infra/typeorm/entities/Room';
import User from '@modules/users/infra/typeorm/entities/User';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('messages')
export default class Messages {
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

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}