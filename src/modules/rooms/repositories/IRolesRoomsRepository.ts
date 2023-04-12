import IRolesRoomsDTO from "../dtos/ICreateRolesRoomsDTO";
import RolesRooms from "../infra/typeorm/entities/RolesRooms";

export default interface IRolesRoomsRepository {
  findById(id: string): Promise<RolesRooms | null>;
  findByUserId(userId: string): Promise<RolesRooms[] | null>;
  findByRoomId(roomId: string): Promise<RolesRooms[] | null>;
  findByUserIdAndRoomId(userId: string, roomId: string): Promise<RolesRooms | null>;
  create(data: IRolesRoomsDTO): Promise<RolesRooms>;
  save(rolesRooms: RolesRooms): Promise<RolesRooms>;
}