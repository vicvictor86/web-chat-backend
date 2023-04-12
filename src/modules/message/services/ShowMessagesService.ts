import { inject, injectable } from "tsyringe";

import IRoomsRepository from "@modules/rooms/repositories/IRoomsRepository";
import IMessagesRepository from "../repositories/IMessagesRepository";
import IFrontEndResponseMessage from "../dtos/IFrontEndResponseMessage";

import Message from "../infra/typeorm/entities/Messages";
import AppError from "@shared/errors/AppError";

@injectable()
export default class IndexMessageService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,

    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,
  ) { }

  public async execute(roomId: string): Promise<Message[] | null> {
    const room = await this.roomsRepository.findById(roomId);

    if (!room) {
      throw new AppError("Could not find room");
    }

    const messages = await this.messagesRepository.findByRoomId(room.id);

    return messages;
  }
}