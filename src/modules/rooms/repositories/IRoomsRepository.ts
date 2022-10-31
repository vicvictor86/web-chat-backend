import ICreateRoomDTO from "../dtos/ICreateRoomDTO";
import Room from "../infra/typeorm/entities/Room";

export default interface IRoomsRepository {
  findById(id: string): Promise<Room | null>;
  findByUserLimit(user_limit: number): Promise<Room[] | null>;
  findByName(username: string): Promise<Room | null>;
  create(data: ICreateRoomDTO): Promise<Room>;
  save(room: Room): Promise<Room>;
}