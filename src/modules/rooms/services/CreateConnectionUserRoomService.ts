import IFrontEndResponseMessage from "@modules/message/dtos/IFrontEndResponseMessage";
import IMessagesRepository from "@modules/message/repositories/IMessagesRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import ConnectionUsersRooms from "../infra/typeorm/entities/ConnectionUserRoom";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";
import IRoomsRepository from "../repositories/IRoomsRepository";

interface Request {
  user_id: string;

  roomName: string;

  connectionMessage: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class CreateConnectionUserRoomService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,

    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,

    @inject("ConnectionUserRoomRepository")
    private connectionUserRoomRepository: IConnectionUserRoomRepository
  ) { }

  public async execute({ user_id, roomName, connectionMessage, socketInformation }: Request): Promise<ConnectionUsersRooms | null> {
    const { io, socket, callback } = socketInformation;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      socket.emit("app_error", { message: "User not found" });
      return null;
    }

    const newRoom = await this.roomsRepository.findByName(roomName);

    if (!newRoom) {
      socket.emit("app_error", { message: "Room not found" });
      return null;
    }

    socket.join(roomName);

    const userInRoom = await this.connectionUserRoomRepository.findByUserIdAndRoomId(user_id, newRoom.id);

    let connection: ConnectionUsersRooms;
    if (userInRoom) {
      connection = await this.connectionUserRoomRepository.save({
        ...userInRoom,
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

    const sessionMessages = await this.messagesRepository.findByRoomId(newRoom.id);

    if (!sessionMessages) {
      return null;
    }

    const sessionMessagesToFront: IFrontEndResponseMessage[] =
      sessionMessages.map( message => {
        const messageToFront = {
          username: message.user.username,
          text: message.text,
          createdAt: message.created_at,
        } as IFrontEndResponseMessage;

        return messageToFront;
      });

    callback({
      messages: sessionMessagesToFront,
      username: user.username,
      room_id: newRoom.id,
    });

    if (!userInRoom?.is_on_chat) {
      const newMessageConnection = await this.messagesRepository.create({
        user_id: user.id,
        room_id: newRoom.id,
        text: connectionMessage,
      });
      
      const connectionMessageToFront = {
        username: user.username,
        text: newMessageConnection.text,
        createdAt: newMessageConnection.created_at,
      } as IFrontEndResponseMessage;

      io.to(roomName).emit("message", connectionMessageToFront);
    }

    return connection;
  }
}
