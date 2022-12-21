import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Room from "../infra/typeorm/entities/Room";
import IRoomsRepository from "../repositories/IRoomsRepository";

interface Request {
  name: string;

  user_limit: number;

  password: string | undefined;
}

@injectable()
export default class CreateRoomService {

  constructor(
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,
  ) { }

  public async execute({ name, user_limit, password }: Request): Promise<Room> {
    const roomExists = await this.roomsRepository.findByName(name);

    if (roomExists) {
      throw new AppError('Room with this name already exists');
    }

    if(password === "") {
      password = undefined;
    }

    const room = await this.roomsRepository.create({
      name,
      user_limit,
      is_private: password !== undefined,
      password,
    });

    return room;
  }
}