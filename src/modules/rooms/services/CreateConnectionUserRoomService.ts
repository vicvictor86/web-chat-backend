import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";
import IRoomsRepository from "../repositories/IRoomsRepository";

import ConnectionUsersRooms from "../infra/typeorm/entities/ConnectionUserRoom";

interface Request {
  user_id: string;

  room_id: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class CreateConnectionUserRoomService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,

    @inject("ConnectionUserRoomRepository")
    private connectionUserRoomRepository: IConnectionUserRoomRepository
  ) { }

  public async execute({ user_id, room_id, socketInformation }: Request): Promise<ConnectionUsersRooms | null> {
    const { io, socket, callback } = socketInformation;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      socket.emit("app_error", { message: "User not found" });
      return null;
    }

    const newRoom = await this.roomsRepository.findById(room_id);

    if (!newRoom) {
      socket.emit("app_error", { message: "Room not found", code: 404 });
      return null;
    }

    socket.join(newRoom.id);

    const connectionUserInRoom = await this.connectionUserRoomRepository.findByUserIdAndRoomId(user_id, newRoom.id);
    let alreadyInRoom = false;

    let connection: ConnectionUsersRooms;
    if (connectionUserInRoom) {
      alreadyInRoom = connectionUserInRoom.is_on_chat;
      
      connection = await this.connectionUserRoomRepository.save({
        ...connectionUserInRoom,
        socket_id: socket.id,
        room: newRoom,
        is_on_chat: true,
      });
    } else {
      connection = await this.connectionUserRoomRepository.create({
        user_id,
        socket_id: socket.id,
        room_id: newRoom.id,
        is_on_chat: true,
      });
    }

    callback({
      room: newRoom,
      username: user.username,
      is_on_chat: alreadyInRoom,
    })

    io.to(newRoom.id).emit("new_user_connected");

    return connection;
  }
}
