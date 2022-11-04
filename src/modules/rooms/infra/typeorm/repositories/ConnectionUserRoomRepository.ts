import ConnectionUserRoom from '../entities/ConnectionUserRoom';
import { connectionSource } from '@shared/infra/typeorm/index';

import IConnectionUserRoomRepository from '@modules/rooms/repositories/IConnectionUserRoomRepository';
import ICreateConnectionUserRoomDTO from '@modules/rooms/dtos/ICreateConnectionUserRoomDTO';

const connectionUserRoomRepository = connectionSource.getRepository(ConnectionUserRoom);

export const ConnectionUserRoomRepository: IConnectionUserRoomRepository = connectionUserRoomRepository.extend({
  async findById(id: string): Promise<ConnectionUserRoom | null> {
    const connectionUserRoom = await connectionUserRoomRepository.findOne({
      where: {
        id
      }
    });

    return connectionUserRoom;
  },

  async findByUserId(user_id: string): Promise<ConnectionUserRoom[] | null> {
    const connectionUserRoom = await connectionUserRoomRepository.find({
      where: {
        user_id
      }
    });

    return connectionUserRoom;
  },

  async findByRoomId(room_id: string): Promise<ConnectionUserRoom[]| null> {
    const connectionUserRoom = await connectionUserRoomRepository.find({
      where: {
        room_id
      }
    });

    return connectionUserRoom;
  },

  async findByUserIdAndRoomId(user_id: string, room_id: string): Promise<ConnectionUserRoom | null> {
    const connectionUserRoom = await connectionUserRoomRepository.findOne({
      where: {
        user_id,
        room_id
      }
    });

    return connectionUserRoom;
  },

  async create(roomData: ICreateConnectionUserRoomDTO): Promise<ConnectionUserRoom> {
    const connectionUserRoom = connectionUserRoomRepository.create(roomData);

    await connectionUserRoomRepository.save(connectionUserRoom);

    return connectionUserRoom;
  },

  async save(connectionUserRoom: ConnectionUserRoom): Promise<ConnectionUserRoom> {
    return await connectionUserRoomRepository.save(connectionUserRoom);
  },

})