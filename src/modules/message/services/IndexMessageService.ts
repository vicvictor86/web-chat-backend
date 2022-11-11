import { inject, injectable } from "tsyringe";

import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import IConnectionUserRoomRepository from "@modules/rooms/repositories/IConnectionUserRoomRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IRoomsRepository from "@modules/rooms/repositories/IRoomsRepository";
import IMessagesRepository from "../repositories/IMessagesRepository";
import IFrontEndResponseMessage from "../dtos/IFrontEndResponseMessage";

import User from "@modules/users/infra/typeorm/entities/User";
import Message from "../infra/typeorm/entities/Messages";

interface Request {
  roomName: string;

  user_id: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class IndexMessageService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,

    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("ConnectionUserRoomRepository")
    private connectionUserRoomRepository: IConnectionUserRoomRepository,
  ) { }

  public async execute({ user_id, roomName, socketInformation }: Request): Promise<Message[] | null> {
    const { io, socket, callback } = socketInformation;

    const room = await this.roomsRepository.findByName(roomName);

    if (!room) {
      socket.emit("app_error", { message: "Could not find room" });
      return null;
    }

    const messages = await this.messagesRepository.findByRoomId(room.id);

    let messagesToFront: IFrontEndResponseMessage[] = [];
    if(messages){
      messagesToFront =
      messages.map(message => {
        const messageToFront = {
          username: message.user.username,
          text: message.text,
          createdAt: message.created_at,
        } as IFrontEndResponseMessage;

        return messageToFront;
      });
    }

    const userInRoom = await this.usersRepository.findById(user_id);
    const roomConnections = await this.connectionUserRoomRepository.findByRoomId(room.id);

    let onlineUsersInCurrentRoom: User[] = [];
    if(roomConnections) {
      roomConnections.forEach(connection => {
        if(connection.is_on_chat){
          onlineUsersInCurrentRoom.push(connection.user);
        }
      })
    }

    callback({
      messages: messagesToFront,
    });

    return messages;
  }
}