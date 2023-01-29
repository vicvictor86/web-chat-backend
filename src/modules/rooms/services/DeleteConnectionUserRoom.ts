import { inject, injectable } from "tsyringe";

import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import IRoomsRepository from "../repositories/IRoomsRepository";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";
import IRolesRoomsRepository from "../repositories/IRolesRoomsRepository";
import { RolesEnum } from "../infra/typeorm/enums/RolesEnum";

interface Request {
  user_id: string;

  room_id: string;

  userToKickId: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class DeleteConnectionUserRoom {

  constructor(
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("ConnectionUserRoomRepository")
    private connectionUserRoomRepository: IConnectionUserRoomRepository,

    @inject("RolesRoomsRepository")
    private rolesRoomsRepository: IRolesRoomsRepository,

  ) { }

  public async execute({ user_id, room_id, userToKickId, socketInformation }: Request): Promise<void | null> {
    const { io, socket, callback } = socketInformation;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      socket.emit("app_error", { message: "User not found" });
      return null;
    }

    const room = await this.roomsRepository.findById(room_id);

    if (!room) {
      socket.emit("app_error", { message: "Room not found", code: 404 });
      return null;
    }

    const userToKickConnection = await this.connectionUserRoomRepository.findByUserIdAndRoomId(userToKickId, room_id);
    const userToKick = userToKickConnection?.user;

    if (!userToKick) {
      socket.emit("app_error", { message: "User to kick not found" });
      return null;
    }

    const userRole = await this.rolesRoomsRepository.findByUserIdAndRoomId(user_id, room_id);

    if (!userRole || userRole.role === "user") {
      socket.emit("app_error", { message: "User is not admin" });
      return null;
    }

    if (userToKick.id === user_id) {
      socket.emit("app_error", { message: "You can kick yourself " });
      return null;
    }

    const userToKickIsRoomCreator = await this.rolesRoomsRepository.findByUserIdAndRoomId(userToKick.id, room_id);

    if (userToKickIsRoomCreator?.role === "owner") {
      socket.emit("app_error", { message: "You can't kick the room creator " });
      return null;
    }

    await this.connectionUserRoomRepository.delete(userToKickConnection.id);

    io.to(userToKickConnection.socket_id).emit("kicked");

    callback(userToKick.username);
  }
}