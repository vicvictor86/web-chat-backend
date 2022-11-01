import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import ConnectionUsersRooms from "../infra/typeorm/entities/ConnectionUserRoom";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";
import IRoomsRepository from "../repositories/IRoomsRepository";

interface Request {
  user_id: string;

  roomName: string;

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
    private connectionUserRoomRepository: IConnectionUserRoomRepository,
  ) { }

  public async execute({ user_id, roomName, socketInformation }: Request): Promise<ConnectionUsersRooms | null>  {
    const { io, socket, callback } = socketInformation;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      socket.emit("app_error", {message: "User not found"});      
      return null;
    }

    const newRoom = await this.roomsRepository.findByName(roomName);

    if (!newRoom) {
      socket.emit("app_error", {message: "Room not found"});  
      return null;
    }

    const userInRoom = await this.connectionUserRoomRepository.findByUserId(user_id);

    let connection: ConnectionUsersRooms;
    if (userInRoom) {
      connection = await this.connectionUserRoomRepository.save({
        ...userInRoom,
        socket_id: socket.id,
        room: newRoom,
      })
    } else {
      connection = await this.connectionUserRoomRepository.create({
        user_id,
        socket_id: socket.id,
        room_id: newRoom.id,
        is_on_chat: true
      });
    }

    return connection;
  }
}