import IFrontEndResponseMessage from "@modules/message/dtos/IFrontEndResponseMessage";
import IMessagesRepository from "@modules/message/repositories/IMessagesRepository";
import { inject, injectable } from "tsyringe";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import ConnectionUsersRooms from "../infra/typeorm/entities/ConnectionUserRoom";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";

interface Request {
  user_id: string;

  room_id: string;

  connectionMessage: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class CreateConnectionUserRoomService {

  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,

    @inject("ConnectionUserRoomRepository")
    private connectionUserRoomRepository: IConnectionUserRoomRepository,
  ) { }

  public async execute({ user_id, connectionMessage, room_id, socketInformation }: Request): Promise<ConnectionUsersRooms | null> {
    const { io, socket, callback } = socketInformation;

    const connection = await this.connectionUserRoomRepository.findByUserIdAndRoomId(user_id, room_id);

    if (!connection) {
      socket.emit("app_error", { message: "Could not find connection" });
      return null;
    }

    connection.is_on_chat = false;

    const newConnection = await this.connectionUserRoomRepository.save(connection);

    const message = await this.messagesRepository.create({
      room_id: newConnection.room_id,
      user_id: newConnection.user_id,
      text: connectionMessage,
    });

    const messageWithEagle = await this.messagesRepository.findById(message.id);

    const frontEndMessage = {
      username: messageWithEagle?.user.username,
      text: messageWithEagle?.text,
      createdAt: messageWithEagle?.created_at,
    } as IFrontEndResponseMessage;

    io.to(newConnection.room.name).emit("message", frontEndMessage);
    io.to(newConnection.room.name).emit("user_disconnected");

    return connection;
  }
}