import { inject, injectable } from "tsyringe";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import { RolesEnum } from "../infra/typeorm/enums/RolesEnum";
import IRolesRoomsRepository from "../repositories/IRolesRoomsRepository";
import IRoomsRepository from "../repositories/IRoomsRepository";

interface Request {
  user_id: string;

  room_id: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class DeleteRoomService {

  constructor(
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,

    @inject("RolesRoomsRepository")
    private rolesRoomsRepository: IRolesRoomsRepository,
  ) { }

  public async execute({ user_id, room_id, socketInformation }: Request): Promise<void | null> {
    const { io, socket, callback } = socketInformation;

    const userRole = await this.rolesRoomsRepository.findByUserIdAndRoomId(user_id, room_id);

    if (!userRole || userRole.role !== "owner") {
      socket.emit("app_error", { message: "Only the room creator can delete the room. " });
      return null;
    }

    const room = userRole.room;

    if (!room) {
      socket.emit("app_error", { message: "Room not found." });
      return null;
    }

    await this.roomsRepository.delete(room.id);

    io.to(room_id).emit("room_deleted", { message: `Room ${room.name} delete with successful.`, code: 201 });
  }
}