import ICreateConnectionUserRoomDTO from "../dtos/ICreateConnectionUserRoomDTO";
import ConnectionUserRoom from "../infra/typeorm/entities/ConnectionUserRoom";

export default interface IConnectionUserRoomRepository {
  findById(id: string): Promise<ConnectionUserRoom | null>;
  findByUserId(user_id: string): Promise<ConnectionUserRoom[] | null>;
  findByRoomId(room_id: string): Promise<ConnectionUserRoom[] | null>;
  findByUserIdAndRoomId(user_id: string, room_id: string): Promise<ConnectionUserRoom | null>;
  findBySocketId(socket_id: string): Promise<ConnectionUserRoom | null>;
  create(data: ICreateConnectionUserRoomDTO): Promise<ConnectionUserRoom>;
  delete(id: string): Promise<void>;
  save(connectionUserRoom: ConnectionUserRoom): Promise<ConnectionUserRoom>;
}