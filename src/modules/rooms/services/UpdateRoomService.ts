import { inject, injectable } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import { compare, hash } from "bcryptjs";

import Room from "../infra/typeorm/entities/Room";

import IRoomsRepository from "../repositories/IRoomsRepository";
import ISocketInformationDTO from "@shared/dtos/ISocketInformationDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IRolesRoomsRepository from "../repositories/IRolesRoomsRepository";

interface Request {
  userId: string;

  roomId: string;

  newRoomName: string;

  newRoomPassword: string;

  newRoomUserLimit: number;

  isPrivate: boolean;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class UpdateRoomService {

  constructor(
    @inject("RolesRoomsRepository")
    private rolesRoomsRepository: IRolesRoomsRepository,

    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ userId, roomId, newRoomName, newRoomPassword, newRoomUserLimit, isPrivate, socketInformation }: Request): Promise<Room | null> {
    const { socket, io, callback } = socketInformation;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      socket.emit("error", { message: "User not found" });
      return null;
    }

    const room = await this.roomsRepository.findById(roomId);

    if (!room) {
      socket.emit("error", { message: "Room not found" });
      return null;
    }

    const userRole = await this.rolesRoomsRepository.findByUserIdAndRoomId(userId, roomId);

    if (!userRole || userRole.role === "user") {
      socket.emit("error", { message: "User is not adm" });
      return null;
    }

    const olderPassword = room.password;

    const password = await hash(newRoomPassword, 8);

    const updatedRoom = await this.roomsRepository.update({ roomId, name: newRoomName, password, userLimit: newRoomUserLimit, isPrivate });

    const isSamePassword = !newRoomPassword || await compare(newRoomPassword, olderPassword);

    io.to(roomId).emit("room_updated", { room: instanceToInstance(updatedRoom), isSamePassword });

    return updatedRoom;
  }
}