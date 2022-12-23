import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import Room from "../infra/typeorm/entities/Room";
import IAdmRoomsRepository from "../repositories/IAdmRoomsRepository";
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

    @inject("AdmRoomsRepository")
    private admRoomsRepository: IAdmRoomsRepository

  ) { }

  public async execute({ name, user_limit, password, user_id }: Request): Promise<Room> {
    const roomExists = await this.roomsRepository.findByName(name);

    if (roomExists) {
      throw new AppError('Room with this name already exists');
    }

    if(password === "") {
      password = undefined;
    } else if(password){
      password = await hash(password, 8);
    }

    const room = await this.roomsRepository.create({
      name,
      user_limit,
      is_private: password !== undefined,
      password,
    });

    await this.admRoomsRepository.create({
      room_id: room.id,
      room_creator: true,
      user_id,
    })

    return room;
  }
}