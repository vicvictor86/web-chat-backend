import ICreateConnectionUserRoomDTO from "../dtos/ICreateConnectionUserRoomDTO";
import ConnectionUserRoom from "../infra/typeorm/entities/ConnectionUserRoom";

export default interface IConnectionUserRoomRepository {
  findById(id: string): Promise<ConnectionUserRoom | null>;
  findByUserId(user_id: string): Promise<ConnectionUserRoom | null>;
  findByRoomId(room_id: string): Promise<ConnectionUserRoom | null>;
  findByUserIdAndRoomId(user_id: string, room_id: string): Promise<ConnectionUserRoom | null>;
  create(data: ICreateConnectionUserRoomDTO): Promise<ConnectionUserRoom>;
  save(connectionUserRoom: ConnectionUserRoom): Promise<ConnectionUserRoom>;
}