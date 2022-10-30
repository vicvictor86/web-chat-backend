import ISocketInformationDTO from "../../../../../shared/dtos/ISocketInformationDTO";
import Message from "../../../../message/infra/typeorm/entities/Messages";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import CreateUserService from "../../../services/CreateUserService";
import { container } from "tsyringe";

export default class WebSocketUsersController {
  public async create(data: ICreateUserDTO, socketInformation: ISocketInformationDTO): Promise<void> {
    const { username, socket_id, room } = data;
    
    const createUserService = container.resolve(CreateUserService);
    
    const user = createUserService.execute({ username, socket_id, room, socketInformation });
  }

  public getUserMessages(room: string, messages: Message[]): Message[] {
    const userMessages = messages.filter(message => message.room === room);
    return userMessages;
  }
}