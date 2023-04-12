import { container } from "tsyringe";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import DeleteRoomService from "@modules/rooms/services/DeleteRoomService";
import UpdateRoomService from "@modules/rooms/services/UpdateRoomService";

interface DeleteRequest {
  userId: string;

  roomId: string;
}

interface UpdateRequest {
  userId: string;

  roomId: string;

  newRoomName: string;

  newRoomPassword: string;

  newRoomUserLimit: number;

  isPrivate: boolean;
}

export default class ConnectionUserRoomController {
  public async delete({ userId, roomId }: DeleteRequest, socketInformation: ISocketInformationDTO): Promise<void> {
    const deleteService = container.resolve(DeleteRoomService);

    await deleteService.execute({ userId, roomId, socketInformation });
  }

  public async update({ userId, roomId, newRoomName, newRoomPassword, newRoomUserLimit, isPrivate }: UpdateRequest, socketInformation: ISocketInformationDTO): Promise<void> {
    const updateConnectionUserRoomService = container.resolve(UpdateRoomService);

    await updateConnectionUserRoomService.execute({ userId, roomId, newRoomName, newRoomPassword, newRoomUserLimit, isPrivate, socketInformation });
  }
}