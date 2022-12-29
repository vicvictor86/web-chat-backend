import AdmRooms from '../entities/AdmRooms';
import { connectionSource } from '@shared/infra/typeorm/index';

import IAdmRoomsRepository from '@modules/rooms/repositories/IAdmRoomsRepository';
import ICreateAdmRoomsDTO from '@modules/rooms/dtos/ICreateAdmRoomsDTO';

const admRoomsRepository = connectionSource.getRepository(AdmRooms);

export const AdmRoomsRepository: IAdmRoomsRepository = admRoomsRepository.extend({
  async findById(id: string): Promise<AdmRooms | null> {
    const admRooms = await admRoomsRepository.findOne({
      where: {
        id
      }
    });

    return admRooms;
  },

  async findByUserId(user_id: string): Promise<AdmRooms[] | null> {
    const admRooms = await admRoomsRepository.find({
      where: {
        user_id
      }
    });

    return admRooms;
  },

  async findByRoomId(room_id: string): Promise<AdmRooms[]| null> {
    const admRooms = await admRoomsRepository.find({
      where: {
        room_id
      }
    });

    return admRooms;
  },

  async findByUserIdAndRoomId(user_id: string, room_id: string): Promise<AdmRooms | null> {
    const admRooms = await admRoomsRepository.findOne({
      where: {
        user_id,
        room_id
      }
    });

    return admRooms;
  },

  async create(roomData: ICreateAdmRoomsDTO): Promise<AdmRooms> {
    const admRooms = admRoomsRepository.create(roomData);

    await admRoomsRepository.save(admRooms);

    return admRooms;
  },

  async save(admRooms: AdmRooms): Promise<AdmRooms> {
    return await admRoomsRepository.save(admRooms);
  },

})