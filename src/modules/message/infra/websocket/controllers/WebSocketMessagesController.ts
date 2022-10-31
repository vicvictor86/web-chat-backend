import ICreateMessageDTO from "../../../dtos/ICreateMessageDTO";
import CreateMessageService from "../../../services/CreateMessageService";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import { container } from "tsyringe";

export default class WebSocketMessagesController {
  public async create(data: ICreateMessageDTO, socketInformation: ISocketInformationDTO): Promise<void> {
    const { username, text, room } = data;

    const createMessageService = container.resolve(CreateMessageService);

    const message = await createMessageService.execute({ username, text, room, socketInformation });
  }
}