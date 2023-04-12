import { inject, injectable } from "tsyringe";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import ConnectionUsersRooms from "../infra/typeorm/entities/ConnectionUserRoom";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";

interface Request {
  userId: string;

  roomId: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class IndexConnectionUserRoomService {

  constructor(
    @inject("ConnectionUserRoomRepository")
    private connectionUserRoomRepository: IConnectionUserRoomRepository,
  ) { }

  public async execute({userId, roomId, socketInformation }: Request): Promise<ConnectionUsersRooms[] | null> {
    const { io, socket, callback } = socketInformation;

    if(userId && !roomId) {
      const connections = await this.connectionUserRoomRepository.findByUserId(userId);
      
      callback({
        connections
      })

      return connections;
    }

    if(!userId && roomId) {
      const connections = await this.connectionUserRoomRepository.findByRoomId(roomId);
      
      callback({
        connections
      })

      return connections;
    }

    if(userId && roomId) {
      const connections = [];
      const connectionUserRoom = await this.connectionUserRoomRepository.findByUserIdAndRoomId(userId, roomId);

      if(connectionUserRoom){
        connections.push(connectionUserRoom);
      }

      callback(connections);

      return connections;
    }

    socket.emit("error", { message: "User and room not found "});

    return null;
  }
}