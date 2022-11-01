import CreateMessageService from "../../../services/CreateMessageService";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import { container } from "tsyringe";

interface Request {
  user_id: string;

  text: string;

  roomName: string;
}

export default class MessagesController {
  public async create(data: Request, socketInformation: ISocketInformationDTO): Promise<void> {
    const { user_id, text, roomName } = data;

    const createMessageService = container.resolve(CreateMessageService);

    const message = await createMessageService.execute({ user_id, text, roomName, socketInformation });
  }
}