import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import Room from "../infra/typeorm/entities/Room";

import IAdmRoomsRepository from "../repositories/IAdmRoomsRepository";
import IRoomsRepository from "../repositories/IRoomsRepository";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { instanceToInstance } from "class-transformer";
import { compare, hash } from "bcryptjs";

interface Request {
  user_id: string;

  room_id: string;

  newRoomName: string;

  newRoomPassword: string;

  newRoomUserLimit: number;

  is_private: boolean;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class UpdateRoomService {

  constructor(
    @inject("AdmRoomsRepository")
    private admRoomsRepository: IAdmRoomsRepository,

    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ user_id, room_id, newRoomName, newRoomPassword, newRoomUserLimit, is_private, socketInformation }: Request): Promise<Room | null> {
    const { socket, io, callback } = socketInformation;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      socket.emit("error", { message: "User not found" });
      return null;
    }

    const room = await this.roomsRepository.findById(room_id);

    if (!room) {
      socket.emit("error", { message: "Room not found" });
      return null;
    }

    const adm = await this.admRoomsRepository.findByUserIdAndRoomId(user_id, room_id);

    if (!adm) {
      socket.emit("error", { message: "User is not adm" });
      return null;
    }

    const olderPassword = room.password;

    const password = await hash(newRoomPassword, 8);

    const updatedRoom = await this.roomsRepository.update({ room_id, name: newRoomName, password, user_limit: newRoomUserLimit, is_private });

    const isSamePassword = !newRoomPassword || await compare(newRoomPassword, olderPassword);

    io.to(room_id).emit("room_updated", { room: instanceToInstance(updatedRoom), isSamePassword });

    return updatedRoom;
  }
}