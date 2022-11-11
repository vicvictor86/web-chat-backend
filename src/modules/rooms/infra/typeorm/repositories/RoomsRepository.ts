import Room from '../entities/Room';
import { connectionSource } from '@shared/infra/typeorm/index';

import IRoomRepository from '@modules/rooms/repositories/IRoomsRepository';
import ICreateUserDTO from '@modules/rooms/dtos/ICreateRoomDTO';

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

  async create(roomData: ICreateUserDTO): Promise<Room> {
    const room = roomsRepository.create(roomData);

    await roomsRepository.save(room);

    return room;
  },

  async save(room: Room): Promise<Room> {
    return await roomsRepository.save(room);
  },

})