import { container } from "tsyringe";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import ICreateConnectionUserRoomDTO from "@modules/rooms/dtos/ICreateConnectionUserRoomDTO";
import CreateConnectionUserRoomService from "@modules/rooms/services/CreateConnectionUserRoomService";

interface Request {
  user_id: string;

  roomName: string;
}

export default class WebSocketUsersController {
  public async create({user_id, roomName}: Request, socketInformation: ISocketInformationDTO): Promise<void> {
    const createConnectionUserRoomService = container.resolve(CreateConnectionUserRoomService);
    
    await createConnectionUserRoomService.execute({ user_id, roomName, socketInformation });
  }

  public async delete(username: string, room: string, connectionMessage: string, socketInformation: ISocketInformationDTO): Promise<void> {
    
  }
}