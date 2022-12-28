import { inject, injectable } from "tsyringe";

import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import IAdmRoomsRepository from "../repositories/IAdmRoomsRepository";
import IRoomsRepository from "../repositories/IRoomsRepository";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";

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

    @inject("AdmRoomsRepository")
    private admRoomsRepository: IAdmRoomsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("ConnectionUserRoomRepository")
    private connectionUserRoomRepository: IConnectionUserRoomRepository,

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

    const userIsAdm = await this.admRoomsRepository.findByUserIdAndRoomId(user_id, room_id);

    if (!userIsAdm) {
      socket.emit("app_error", { message: "User is not admin" });
      return null;
    }

    if (userToKick.id === user_id) {
      socket.emit("app_error", { message: "You can kick yourself " });
      return null;
    }

    const userToKickIsRoomCreator = await this.admRoomsRepository.findByUserIdAndRoomId(userToKick.id, room_id);

    if (userToKickIsRoomCreator?.room_creator) {
      socket.emit("app_error", { message: "You can kick the room creator " });
      return null;
    }

    await this.connectionUserRoomRepository.delete(userToKickConnection.id);
    
    io.to(userToKickConnection.socket_id).emit("kicked");
    
    callback(userToKick.username);
  }
}