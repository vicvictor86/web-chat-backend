import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import Room from "../infra/typeorm/entities/Room";

import IAdmRoomsRepository from "../repositories/IAdmRoomsRepository";
import IRoomsRepository from "../repositories/IRoomsRepository";

interface Request {
  user_id: string;

  room_id: string;

  newRoomName: string;

  newRoomPassword: string;

  newRoomUserLimit: number;

  is_private: boolean;
}

@injectable()
export default class UpdateRoomService {

  constructor(

    @inject("AdmRoomsRepository")
    private admRoomsRepository: IAdmRoomsRepository,

    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,
  ) { }

  public async execute({ user_id, room_id, newRoomName, newRoomPassword, newRoomUserLimit, is_private }: Request): Promise<Room | null> {
    const adm = await this.admRoomsRepository.findByUserIdAndRoomId(user_id, room_id);

    if (!adm) {
      throw new AppError("User is not adm of this room");
    }

    const updatedRoom = await this.roomsRepository.update({ room_id, name:newRoomName, password:newRoomPassword, user_limit: newRoomUserLimit, is_private });

    return updatedRoom;
  }
}