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

  async findByUserId(user_id: string): Promise<RolesRooms[] | null> {
    const rolesRooms = await rolesRoomsRepository.find({
      where: {
        user_id
      }
    });

    return rolesRooms;
  },

  async findByRoomId(room_id: string): Promise<RolesRooms[]| null> {
    const rolesRooms = await rolesRoomsRepository.find({
      where: {
        room_id
      }
    });

    return rolesRooms;
  },

  async findByUserIdAndRoomId(user_id: string, room_id: string): Promise<RolesRooms | null> {
    const rolesRooms = await rolesRoomsRepository.findOne({
      where: {
        user_id,
        room_id
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