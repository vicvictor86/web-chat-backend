import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Room from "../infra/typeorm/entities/Room";
import IRoomsRepository from "../repositories/IRoomsRepository";

interface Request {
  name: string;

  user_limit: number;
}

@injectable()
export default class ShowRoomService {

  constructor(
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,
  ) { }

  public async execute(): Promise<Room[]> {
    const rooms = await this.roomsRepository.all();

    if(!rooms){
      return [];
    }

    return rooms;
  }
}