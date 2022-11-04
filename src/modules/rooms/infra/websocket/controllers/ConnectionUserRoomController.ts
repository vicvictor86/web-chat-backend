import { container } from "tsyringe";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import CreateConnectionUserRoomService from "@modules/rooms/services/CreateConnectionUserRoomService";
import UpdateConnectionUserRoomService from "@modules/rooms/services/UpdateConnectionUserRoomService";
import IndexConnectionUserRoomService from "@modules/rooms/services/IndexConnectionUserRoomService";

interface Request {
  user_id: string;

  roomName: string;
}

interface DisconnectRequest {
  user_id: string;

  room_id: string;

  connectionMessage: string;
}

interface ConnectionsRequest {
  user_id: string;

  room_id: string;
}

export default class ConnectionUserRoomController {
  public async create({ user_id, roomName }: Request, socketInformation: ISocketInformationDTO): Promise<void> {
    const createConnectionUserRoomService = container.resolve(CreateConnectionUserRoomService);

    await createConnectionUserRoomService.execute({ user_id, roomName, socketInformation });
  }

  public async update({ user_id, room_id, connectionMessage }: DisconnectRequest, socketInformation: ISocketInformationDTO): Promise<void> {
    const updateConnectionUserRoomService = container.resolve(UpdateConnectionUserRoomService);
    
    await updateConnectionUserRoomService.execute({ user_id, room_id, connectionMessage, socketInformation });
  }

  public async index({ user_id, room_id }: ConnectionsRequest, socketInformation: ISocketInformationDTO) {
    const indexConnectionUserRoomService = container.resolve(IndexConnectionUserRoomService);

    await indexConnectionUserRoomService.execute({ user_id, room_id, socketInformation });
  }
}