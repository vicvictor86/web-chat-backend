import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import { inject, injectable } from "tsyringe";
import Message from "../infra/typeorm/entities/Messages";
import IMessagesRepository from "../repositories/IMessagesRepository";

interface Request {
  username: string;

  text: string;

  room: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class CreateMessageService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,
  ){}

  public async execute({username, room, text, socketInformation}: Request): Promise<Message> {
    const { io, socket, callback } = socketInformation;

    const message = await this.messagesRepository.create({
      username,
      room,
      text,
    });

    io.to(room).emit("message", message);

    return message;
  }
}