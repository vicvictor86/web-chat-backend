import ICreateMessageDTO from "../dtos/ICreateMessageDTO";
import Messages from "../infra/typeorm/entities/Messages";

export default interface IMessagesRepository {
  findById(id: string): Promise<Messages | null>;
  findByUsername(username: string): Promise<Messages | null>;
  findByRoom(room: string): Promise<Messages[] | null>;
  create(data: ICreateMessageDTO): Promise<Messages>;
  save(message: Messages): Promise<Messages>;
}