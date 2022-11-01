import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
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

  public async execute({ user_id, roomName, socketInformation }: Request): Promise<ConnectionUsersRooms> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exist");
    }

    const room = await this.roomsRepository.findByName(roomName);

    if (!room) {
      throw new AppError("Room does not exist");
    }

    const { io, socket, callback } = socketInformation;

    socket.join(roomName);

    const userInRoom = await this.connectionUserRoomRepository.findByUserIdAndRoomId(user_id, room.id);

    let connection: ConnectionUsersRooms;
    if (userInRoom) {
      connection = await this.connectionUserRoomRepository.save({
        ...userInRoom,
        socket_id: socket.id,
      })
    } else {
      connection = await this.connectionUserRoomRepository.create({
        user_id,
        socket_id: socket.id,
        room_id: room.id,
        is_on_chat: true
      });
    }

    return connection;
  }
}