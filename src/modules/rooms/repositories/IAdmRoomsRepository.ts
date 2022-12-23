import ICreateAdmRoomsDTO from "../dtos/ICreateAdmRoomsDTO";
import AdmRooms from "../infra/typeorm/entities/AdmRooms";

export default interface IAdmRoomsRepository {
  findById(id: string): Promise<AdmRooms | null>;
  findByUserId(user_id: string): Promise<AdmRooms[] | null>;
  findByRoomId(room_id: string): Promise<AdmRooms[] | null>;
  findByUserIdAndRoomId(user_id: string, room_id: string): Promise<AdmRooms | null>;
  create(data: ICreateAdmRoomsDTO): Promise<AdmRooms>;
  save(AdmRooms: AdmRooms): Promise<AdmRooms>;
}