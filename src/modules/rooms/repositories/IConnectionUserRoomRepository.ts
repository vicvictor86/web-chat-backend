import ICreateConnectionUserRoomDTO from "../dtos/ICreateConnectionUserRoomDTO";
import ConnectionUserRoom from "../infra/typeorm/entities/ConnectionUserRoom";

export default interface IConnectionUserRoomRepository {
  findById(id: string): Promise<ConnectionUserRoom | null>;
  findByUserId(userId: string): Promise<ConnectionUserRoom[] | null>;
  findByRoomId(roomId: string): Promise<ConnectionUserRoom[] | null>;
  findByUserIdAndRoomId(userId: string, roomId: string): Promise<ConnectionUserRoom | null>;
  findBySocketId(socketId: string): Promise<ConnectionUserRoom | null>;
  create(data: ICreateConnectionUserRoomDTO): Promise<ConnectionUserRoom>;
  delete(id: string): Promise<void>;
  save(connectionUserRoom: ConnectionUserRoom): Promise<ConnectionUserRoom>;
}