import { container } from "tsyringe";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import CreateConnectionUserRoomService from "@modules/rooms/services/CreateConnectionUserRoomService";
import UpdateConnectionUserRoomService from "@modules/rooms/services/UpdateConnectionUserRoomService";
import IndexConnectionUserRoomService from "@modules/rooms/services/IndexConnectionUserRoomService";

interface Request {
  user_id: string;

  roomName: string;

  connectionMessage: string;
}

interface DisconnectRequest {
  user_id: string;

  room_id: string;
  
  connectionMessage: string;
}

export default class WebSocketUsersController {
  public async create({user_id, roomName, connectionMessage }: Request, socketInformation: ISocketInformationDTO): Promise<void> {
    const createConnectionUserRoomService = container.resolve(CreateConnectionUserRoomService);
    
    await createConnectionUserRoomService.execute({ user_id, roomName, connectionMessage, socketInformation });
  }

  public async update({user_id, room_id, connectionMessage}: DisconnectRequest, socketInformation: ISocketInformationDTO): Promise<void> {
    const updateConnectionUserRoomService = container.resolve(UpdateConnectionUserRoomService);

    await updateConnectionUserRoomService.execute({ user_id, room_id, connectionMessage, socketInformation });
  }

  public async index(room_id: string, socketInformation: ISocketInformationDTO) {
    const indexConnectionUserRoomService = container.resolve(IndexConnectionUserRoomService);

    await indexConnectionUserRoomService.execute({room_id, socketInformation});
  }
}