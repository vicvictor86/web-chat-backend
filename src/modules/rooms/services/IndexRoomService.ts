import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Room from "../infra/typeorm/entities/Room";
import IRoomsRepository from "../repositories/IRoomsRepository";

@injectable()
export default class IndexRoomService {

  constructor(
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,
  ) { }

  public async execute(id: string): Promise<Room | null> {
    const room = await this.roomsRepository.findById(id);

    if(!room){
      throw new AppError(`Room not found`);
    }

    return room;
  }
}