import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Room from "../infra/typeorm/entities/Room";
import IConnectionUserRoomRepository from "../repositories/IConnectionUserRoomRepository";

@injectable()
export default class IndexRoomUserService {

  constructor(
    @inject("ConnectionUserRoomRepository")
    private connectionUserRoomRepository: IConnectionUserRoomRepository,
  ) { }

  public async execute(id: string): Promise<Room[]> {
    const roomsConnected = await this.connectionUserRoomRepository.findByUserId(id);

    if(!roomsConnected) {
      return [];
    }

    const rooms = roomsConnected.map(roomConnected => {
      return roomConnected.room;
    });

    if(!rooms){
      return [];
    }

    return rooms;
  }
}