import { container } from "tsyringe";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import CreateConnectionUserRoomService from "@modules/rooms/services/CreateConnectionUserRoomService";
import UpdateConnectionUserRoomService from "@modules/rooms/services/UpdateConnectionUserRoomService";
import IndexConnectionUserRoomService from "@modules/rooms/services/IndexConnectionUserRoomService";
import DeleteConnectionUserRoom from "@modules/rooms/services/DeleteConnectionUserRoom";

interface Request {
  user_id: string;

  room_id: string;

  password: string;

  is_private: boolean;
}

interface ConnectionsRequest {
  user_id: string;

  room_id: string;
}

interface DeleteRequest {
  user_id: string;
  
  room_id: string;
  
  userToKickId: string; 
}

export default class ConnectionUserRoomController {
  public async create({ user_id, room_id }: Request, socketInformation: ISocketInformationDTO): Promise<void> {
    const createConnectionUserRoomService = container.resolve(CreateConnectionUserRoomService);

    await createConnectionUserRoomService.execute({ user_id, room_id, socketInformation });
  }

  public async delete({ user_id, room_id, userToKickId }: DeleteRequest, socketInformation: ISocketInformationDTO): Promise<void> {
    const deleteConnectionUserRoomService = container.resolve(DeleteConnectionUserRoom);

    await deleteConnectionUserRoomService.execute({ user_id, room_id, userToKickId, socketInformation });
  }

  public async update(socketInformation: ISocketInformationDTO): Promise<void> {
    const updateConnectionUserRoomService = container.resolve(UpdateConnectionUserRoomService);

    await updateConnectionUserRoomService.execute({ socketInformation });
  }

  public async index({ user_id, room_id }: ConnectionsRequest, socketInformation: ISocketInformationDTO) {
    const indexConnectionUserRoomService = container.resolve(IndexConnectionUserRoomService);

    await indexConnectionUserRoomService.execute({ user_id, room_id, socketInformation });
  }
}