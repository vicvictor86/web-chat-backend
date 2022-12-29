import { inject, injectable } from "tsyringe";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import ConnectionUsersRooms from "../infra/typeorm/entities/ConnectionUserRoom";
import IAdmRoomsRepository from "../repositories/IAdmRoomsRepository";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";
import IRoomsRepository from "../repositories/IRoomsRepository";

interface Request {
  user_id: string;

  room_id: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class DeleteRoomService {

  constructor(
    @inject("AdmRoomsRepository")
    private admRoomsRepository: IAdmRoomsRepository,

    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,
  ) { }

  public async execute({ user_id, room_id, socketInformation }: Request): Promise<void | null> {
    const { io, socket, callback } = socketInformation;

    const userIsAdm = await this.admRoomsRepository.findByUserIdAndRoomId(user_id, room_id);

    if (!userIsAdm || !userIsAdm.room_creator) {
      socket.emit("app_error", { message: "Only the room creator can delete the room. " });
      return null;
    }

    const room = userIsAdm.room;

    if (!room) {
      socket.emit("app_error", { message: "Room not found." });
      return null;
    }

    await this.roomsRepository.delete(room.id);

    io.to(room_id).emit("room_deleted", { message: `Room ${room.name} delete with successful.`, code: 201 });
  }
}