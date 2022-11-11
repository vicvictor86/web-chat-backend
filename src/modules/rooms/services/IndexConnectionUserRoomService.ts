import { inject, injectable } from "tsyringe";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import ConnectionUsersRooms from "../infra/typeorm/entities/ConnectionUserRoom";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";

interface Request {
  user_id: string;

  room_id: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class IndexConnectionUserRoomService {

  constructor(
    @inject("ConnectionUserRoomRepository")
    private connectionUserRoomRepository: IConnectionUserRoomRepository,
  ) { }

  public async execute({user_id, room_id, socketInformation }: Request): Promise<ConnectionUsersRooms[] | null> {
    const { io, socket, callback } = socketInformation;

    if(user_id && !room_id) {
      const connections = await this.connectionUserRoomRepository.findByUserId(user_id);
      
      callback({
        connections
      })

      return connections;
    }

    if(!user_id && room_id) {
      const connections = await this.connectionUserRoomRepository.findByRoomId(room_id);
      
      callback({
        connections
      })

      return connections;
    }

    if(user_id && room_id) {
      const connections = [];
      const connectionUserRoom = await this.connectionUserRoomRepository.findByUserIdAndRoomId(user_id, room_id);

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