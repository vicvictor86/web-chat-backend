import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import Room from "../infra/typeorm/entities/Room";
import IRolesRoomsRepository from "../repositories/IRolesRoomsRepository";
import IRoomsRepository from "../repositories/IRoomsRepository";

interface Request {
  name: string;

  user_limit: number;

  password: string | undefined;

  user_id: string;
}

@injectable()
export default class CreateRoomService {

  constructor(
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,

    @inject("RolesRoomsRepository")
    private rolesRoomsRepository: IRolesRoomsRepository,

  ) { }

  public async execute({ name, user_limit, password, user_id }: Request): Promise<Room> {
    const roomExists = await this.roomsRepository.findByName(name);

    if (roomExists) {
      throw new AppError('Room with this name already exists');
    }

    if (password === "") {
      password = undefined;
    } else if (password) {
      password = await hash(password, 8);
    }

    const room = await this.roomsRepository.create({
      name,
      user_limit,
      is_private: password !== undefined,
      password,
    });

    await this.rolesRoomsRepository.create({
      room_id: room.id,
      user_id,
      role: 'owner',
    });

    return room;
  }
}