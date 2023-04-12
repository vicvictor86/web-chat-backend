import { connectionSource } from '@shared/infra/typeorm/index';

import RolesRooms from '../entities/RolesRooms';
import IRolesRoomsRepository from '@modules/rooms/repositories/IRolesRoomsRepository';
import ICreateRolesRoomsDTO from '@modules/rooms/dtos/ICreateRolesRoomsDTO';

const rolesRoomsRepository = connectionSource.getRepository(RolesRooms);

export const RolesRoomsRepository: IRolesRoomsRepository = rolesRoomsRepository.extend({
  async findById(id: string): Promise<RolesRooms | null> {
    const rolesRooms = await rolesRoomsRepository.findOne({
      where: {
        id
      }
    });

    return rolesRooms;
  },

  async findByUserId(userId: string): Promise<RolesRooms[] | null> {
    const rolesRooms = await rolesRoomsRepository.find({
      where: {
        userId
      }
    });

    return rolesRooms;
  },

  async findByRoomId(roomId: string): Promise<RolesRooms[]| null> {
    const rolesRooms = await rolesRoomsRepository.find({
      where: {
        roomId
      }
    });

    return rolesRooms;
  },

  async findByUserIdAndRoomId(userId: string, roomId: string): Promise<RolesRooms | null> {
    const rolesRooms = await rolesRoomsRepository.findOne({
      where: {
        userId,
        roomId
      }
    });

    return rolesRooms;
  },

  async create(roomData: ICreateRolesRoomsDTO): Promise<RolesRooms> {
    const rolesRooms = rolesRoomsRepository.create(roomData);

    await rolesRoomsRepository.save(rolesRooms);

    return rolesRooms;
  },

  async save(rolesRooms: RolesRooms): Promise<RolesRooms> {
    return await rolesRoomsRepository.save(rolesRooms);
  },

})