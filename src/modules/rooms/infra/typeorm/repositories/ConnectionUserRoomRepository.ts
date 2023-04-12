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

  async findByUserId(userId: string): Promise<ConnectionUserRoom[] | null> {
    const connectionUserRoom = await connectionUserRoomRepository.find({
      where: {
        userId
      }
    });

    return connectionUserRoom;
  },

  async findByRoomId(roomId: string): Promise<ConnectionUserRoom[] | null> {
    const connectionUserRoom = await connectionUserRoomRepository.find({
      where: {
        roomId
      }
    });

    return connectionUserRoom;
  },

  async findBySocketId(socketId: string): Promise<ConnectionUserRoom | null> {
    const connectionUserRoom = await connectionUserRoomRepository.findOne({
      where: {
        socketId
      }
    });
    
    return connectionUserRoom;
  },

  async findByUserIdAndRoomId(userId: string, roomId: string): Promise<ConnectionUserRoom | null> {
    const connectionUserRoom = await connectionUserRoomRepository.findOne({
      where: {
        userId,
        roomId
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

  async delete(id: string): Promise<void> {
    await connectionUserRoomRepository.delete(id);
  },

})