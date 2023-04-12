import { container } from "tsyringe";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import CreateConnectionUserRoomService from "@modules/rooms/services/CreateConnectionUserRoomService";
import UpdateConnectionUserRoomService from "@modules/rooms/services/UpdateConnectionUserRoomService";
import IndexConnectionUserRoomService from "@modules/rooms/services/IndexConnectionUserRoomService";
import DeleteConnectionUserRoom from "@modules/rooms/services/DeleteConnectionUserRoom";

interface Request {
  userId: string;

  roomId: string;

  password: string;

  isPrivate: boolean;
}

interface ConnectionsRequest {
  userId: string;

  roomId: string;
}

interface DeleteRequest {
  userId: string;
  
  roomId: string;
  
  userToKickId: string; 
}

export default class ConnectionUserRoomController {
  public async create({ userId, roomId }: Request, socketInformation: ISocketInformationDTO): Promise<void> {
    const createConnectionUserRoomService = container.resolve(CreateConnectionUserRoomService);

    await createConnectionUserRoomService.execute({ userId, roomId, socketInformation });
  }

  public async delete({ userId, roomId, userToKickId }: DeleteRequest, socketInformation: ISocketInformationDTO): Promise<void> {
    const deleteConnectionUserRoomService = container.resolve(DeleteConnectionUserRoom);

    await deleteConnectionUserRoomService.execute({ userId, roomId, userToKickId, socketInformation });
  }

  public async update(socketInformation: ISocketInformationDTO): Promise<void> {
    const updateConnectionUserRoomService = container.resolve(UpdateConnectionUserRoomService);

    await updateConnectionUserRoomService.execute({ socketInformation });
  }

  public async index({ userId, roomId }: ConnectionsRequest, socketInformation: ISocketInformationDTO) {
    const indexConnectionUserRoomService = container.resolve(IndexConnectionUserRoomService);

    await indexConnectionUserRoomService.execute({ userId, roomId, socketInformation });
  }
}