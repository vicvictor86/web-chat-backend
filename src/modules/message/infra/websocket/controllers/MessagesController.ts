import CreateMessageService from "../../../services/CreateMessageService";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import { container } from "tsyringe";
import IndexMessageService from "@modules/message/services/IndexMessageService";

interface Request {
  user_id: string;

  text: string;

  roomName: string;
}

interface PreviousMessagesRequest {
  user_id: string;
  
  roomName: string;
}

export default class MessagesController {
  public async create(data: Request, socketInformation: ISocketInformationDTO): Promise<void> {
    const { user_id, text, roomName } = data;

    const createMessageService = container.resolve(CreateMessageService);

    const message = await createMessageService.execute({ user_id, text, roomName, socketInformation });
  }

  public async index(data: PreviousMessagesRequest, socketInformation: ISocketInformationDTO): Promise<void> {
    const { user_id, roomName } = data;
    
    const indexMessageService = container.resolve(IndexMessageService);

    const message = await indexMessageService.execute({ user_id, roomName, socketInformation });
  }
}