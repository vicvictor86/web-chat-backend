import ICreateRoomDTO from "../dtos/ICreateRoomDTO";
import IUpdateRoomDTO from "../dtos/IUpdateRoomDTO";
import Room from "../infra/typeorm/entities/Room";

export default interface IRoomsRepository {
  all(): Promise<Room[] | null>;
  findById(id: string): Promise<Room | null>;
  findByUserLimit(user_limit: number): Promise<Room[] | null>;
  findByName(username: string): Promise<Room | null>;
  create(data: ICreateRoomDTO): Promise<Room>;
  update(data: IUpdateRoomDTO): Promise<Room>;
  save(room: Room): Promise<Room>;
  delete(id: string): Promise<void>;
}