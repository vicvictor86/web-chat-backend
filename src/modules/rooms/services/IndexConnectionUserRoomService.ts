import IMessagesRepository from "@modules/message/repositories/IMessagesRepository";
import { inject, injectable } from "tsyringe";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import ConnectionUsersRooms from "../infra/typeorm/entities/ConnectionUserRoom";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";

interface Request {
  room_id: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class IndexConnectionUserRoomService {

  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,

    @inject("ConnectionUserRoomRepository")
    private connectionUserRoomRepository: IConnectionUserRoomRepository,
  ) { }

  public async execute({ room_id, socketInformation }: Request): Promise<ConnectionUsersRooms[] | null> {
    const { io, socket, callback } = socketInformation;

    const connection = await this.connectionUserRoomRepository.findByRoomId(room_id);

    return connection;
  }
}