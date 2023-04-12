import IFrontEndResponseMessage from "@modules/message/dtos/IFrontEndResponseMessage";
import IMessagesRepository from "@modules/message/repositories/IMessagesRepository";
import { inject, injectable } from "tsyringe";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import ConnectionUsersRooms from "../infra/typeorm/entities/ConnectionUserRoom";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";

interface Request {
  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class UpdateConnectionUserRoomService {

  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,

    @inject("ConnectionUserRoomRepository")
    private connectionUserRoomRepository: IConnectionUserRoomRepository,
  ) { }

  public async execute({ socketInformation }: Request): Promise<ConnectionUsersRooms | null> {
    const { io, socket, callback } = socketInformation;

    const connection = await this.connectionUserRoomRepository.findBySocketId(socket.id);

    if (!connection) {
      socket.emit("app_error", { message: "Could not find connection" });
      return null;
    }

    connection.isOnChat = false;

    const newConnection = await this.connectionUserRoomRepository.save(connection);

    const message = await this.messagesRepository.create({
      roomId: newConnection.roomId,
      userId: newConnection.userId,
      text: " saiu da sala",
    });

    const messageWithEagle = await this.messagesRepository.findById(message.id);

    const frontEndMessage = {
      username: messageWithEagle?.user.username,
      text: messageWithEagle?.text,
      createdAt: messageWithEagle?.created_at,
    } as IFrontEndResponseMessage;

    io.to(newConnection.room.id).emit("message", frontEndMessage);
    io.to(newConnection.room.id).emit("user_disconnected");

    return connection;
  }
}