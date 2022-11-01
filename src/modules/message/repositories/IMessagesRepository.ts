import ICreateMessageDTO from "../dtos/ICreateMessageDTO";
import Messages from "../infra/typeorm/entities/Messages";

export default interface IMessagesRepository {
  findById(id: string): Promise<Messages | null>;
  findByText(text: string): Promise<Messages[] | null>;
  findByUserId(userId: string): Promise<Messages[] | null>;
  findByRoomId(roomId: string): Promise<Messages[] | null>;
  create(data: ICreateMessageDTO): Promise<Messages>;
  save(message: Messages): Promise<Messages>;
}