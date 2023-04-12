import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";
import IRoomsRepository from "../repositories/IRoomsRepository";

import ConnectionUsersRooms from "../infra/typeorm/entities/ConnectionUserRoom";

interface Request {
  userId: string;

  roomId: string;

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

  public async execute({ userId, roomId, socketInformation }: Request): Promise<ConnectionUsersRooms | null> {
    const { io, socket, callback } = socketInformation;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      socket.emit("app_error", { message: "User not found" });
      return null;
    }

    const newRoom = await this.roomsRepository.findById(roomId);

    if (!newRoom) {
      socket.emit("app_error", { message: "Room not found", code: 404 });
      return null;
    }

    const connectionUserInRoom = await this.connectionUserRoomRepository.findByUserIdAndRoomId(userId, newRoom.id);
    let alreadyInRoom = false;
    
    let connection: ConnectionUsersRooms;
    if (connectionUserInRoom) {
      alreadyInRoom = connectionUserInRoom.isOnChat;
      
      connection = await this.connectionUserRoomRepository.save({
        ...connectionUserInRoom,
        socketId: socket.id,
        room: newRoom,
        isOnChat: true,
      });
    } else {
      newRoom.userQuantity += 1;

      if(newRoom.userQuantity > newRoom.userLimit) {
        socket.emit("app_error", { message: "Room is full", code: 400 });
        return null;
      }

      await this.roomsRepository.save(newRoom);

      connection = await this.connectionUserRoomRepository.create({
        userId,
        socketId: socket.id,
        roomId: newRoom.id,
        isOnChat: true,
      });
    }
    
    socket.join(newRoom.id);

    callback({
      room: newRoom,
      isOnChat: alreadyInRoom,
    })

    io.to(newRoom.id).emit("new_user_connected");

    return connection;
  }
}
