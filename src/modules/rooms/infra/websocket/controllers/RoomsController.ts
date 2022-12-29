import { container } from "tsyringe";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import DeleteRoomService from "@modules/rooms/services/DeleteRoomService";
import UpdateRoomService from "@modules/rooms/services/UpdateRoomService";

interface DeleteRequest {
  user_id: string;

  room_id: string;
}

interface UpdateRequest {
  user_id: string;

  room_id: string;

  newRoomName: string;

  newRoomPassword: string;

  newRoomUserLimit: number;

  isPrivate: boolean;
}

export default class ConnectionUserRoomController {
  public async delete({ user_id, room_id }: DeleteRequest, socketInformation: ISocketInformationDTO): Promise<void> {
    const deleteService = container.resolve(DeleteRoomService);

    await deleteService.execute({ user_id, room_id, socketInformation });
  }

  public async update({ user_id, room_id, newRoomName, newRoomPassword, newRoomUserLimit, isPrivate }: UpdateRequest, socketInformation: ISocketInformationDTO): Promise<void> {
    const updateConnectionUserRoomService = container.resolve(UpdateRoomService);

    await updateConnectionUserRoomService.execute({ user_id, room_id, newRoomName, newRoomPassword, newRoomUserLimit, is_private: isPrivate, socketInformation });
  }
}