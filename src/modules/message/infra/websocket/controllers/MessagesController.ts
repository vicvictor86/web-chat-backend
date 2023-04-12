import CreateMessageService from "../../../services/CreateMessageService";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import { container } from "tsyringe";
import IndexMessageService from "@modules/message/services/IndexMessageService";

interface Request {
  userId: string;

  text: string;

  roomName: string;
}

interface PreviousMessagesRequest {
  userId: string;
  
  roomName: string;

  quantity?: string;

  orderBy?: string;
}

export default class MessagesController {
  public async create(data: Request, socketInformation: ISocketInformationDTO): Promise<void> {
    const { userId, text, roomName } = data;

    const createMessageService = container.resolve(CreateMessageService);

    const message = await createMessageService.execute({ userId, text, roomName, socketInformation });
  }

  public async index(data: PreviousMessagesRequest, socketInformation: ISocketInformationDTO): Promise<void> {
    const { userId, roomName, quantity, orderBy } = data;
    
    const indexMessageService = container.resolve(IndexMessageService);

    const message = await indexMessageService.execute({ userId, roomName, quantity, orderBy, socketInformation });
  }
}