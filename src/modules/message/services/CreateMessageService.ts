import IRoomsRepository from "@modules/rooms/repositories/IRoomsRepository";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import { inject, injectable } from "tsyringe";
import Message from "../infra/typeorm/entities/Messages";
import IMessagesRepository from "../repositories/IMessagesRepository";

interface Request {
  userId: string;

  roomName: string;

  text: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class CreateMessageService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,

    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,
  ) { }

  public async execute({ userId, text, roomName, socketInformation }: Request): Promise<Message | null> {
    const { io, socket, callback } = socketInformation;

    const room = await this.roomsRepository.findByName(roomName);

    if (!room) {
      socket.emit("app_error", { message: "Could not find room" });
      return null;
    }

    const roomId = room.id;
    const message = await this.messagesRepository.create({
      userId,
      roomId,
      text,
    });

    const messageWithEagle = await this.messagesRepository.findById(message.id);

    io.to(roomId).emit("message", messageWithEagle);

    return message;
  }
}