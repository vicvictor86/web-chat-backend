import Room from '../entities/Room';
import { connectionSource } from '@shared/infra/typeorm/index';

import IRoomRepository from '@modules/rooms/repositories/IRoomsRepository';
import ICreateRoomDTO from '@modules/rooms/dtos/ICreateRoomDTO';
import IUpdateRoomDTO from "@modules/rooms/dtos/IUpdateRoomDTO";

const roomsRepository = connectionSource.getRepository(Room);

export const RoomsRepository: IRoomRepository = roomsRepository.extend({
  async all(): Promise<Room[] | null> {
    return await roomsRepository.find();
  },

  async findById(id: string): Promise<Room | null> {
    const room = await roomsRepository.findOne({
      where: {
        id
      }
    });

    return room;
  },

  async findByName(name: string): Promise<Room | null> {
    const room = await roomsRepository.findOne({
      where: {
        name
      }
    });

    return room;
  },

  async findByUserLimit(user_limit: number): Promise<Room[] | null> {
    const room = await roomsRepository.find({
      where: {
        user_limit
      }
    });
    return room;
  },

  async create(roomData: ICreateRoomDTO): Promise<Room> {
    const room = roomsRepository.create(roomData);

    await roomsRepository.save(room);

    return room;
  },

  async update(roomData: IUpdateRoomDTO): Promise<Room> {
    const roomToUpdate = await roomsRepository.findOne({
      where: {
        id: roomData.room_id,
      }
    });

    const updatedRoom = {
      ...roomToUpdate,
      ...(roomData.name && { name: roomData.name }),
      ...(roomData.password && { password: roomData.password }),
      ...(roomData.user_limit && { user_limit: roomData.user_limit }),
      ...(roomData.is_private && { is_private: roomData.is_private }),
    } as Room;

    await roomsRepository.save(updatedRoom)

    return updatedRoom;
  },

  async save(room: Room): Promise<Room> {
    return await roomsRepository.save(room);
  },

})