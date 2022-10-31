import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Room from "../infra/typeorm/entities/Room";
import IRoomsRepository from "../repositories/IRoomsRepository";

interface Request {
  name: string;

  user_limit: number;
}

@injectable()
export default class CreateUserService {

  constructor(
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,
  ) { }

  public async execute({ name, user_limit }: Request): Promise<Room> {
    const roomExists = await this.roomsRepository.findByName(name);

    if (roomExists) {
      throw new AppError('Room with this name already exists');
    }

    const room = await this.roomsRepository.create({
      name,
      user_limit,
    });

    return room;
  }
}