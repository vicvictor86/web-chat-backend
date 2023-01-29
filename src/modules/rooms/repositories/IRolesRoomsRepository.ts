import IRolesRoomsDTO from "../dtos/ICreateRolesRoomsDTO";
import RolesRooms from "../infra/typeorm/entities/RolesRooms";

export default interface IRolesRoomsRepository {
  findById(id: string): Promise<RolesRooms | null>;
  findByUserId(user_id: string): Promise<RolesRooms[] | null>;
  findByRoomId(room_id: string): Promise<RolesRooms[] | null>;
  findByUserIdAndRoomId(user_id: string, room_id: string): Promise<RolesRooms | null>;
  create(data: IRolesRoomsDTO): Promise<RolesRooms>;
  save(rolesRooms: RolesRooms): Promise<RolesRooms>;
}