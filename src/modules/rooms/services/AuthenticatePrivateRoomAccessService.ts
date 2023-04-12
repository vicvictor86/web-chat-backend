import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import IRoomsRepository from "../repositories/IRoomsRepository";
import Room from "../infra/typeorm/entities/Room";

interface Request {
  roomId: string;

  password: string;
}

@injectable()
export default class AuthenticatePrivateRoomAccessService {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
  ){}

  public async execute({ roomId, password }: Request): Promise<Room>{
    const room = await this.roomsRepository.findById(roomId);

    if(!room){
      throw new AppError('This room don\'t exist');
    }

    const hashedPassword = room.password;

    const authenticated = await compare(password, hashedPassword);

    if(!authenticated) {
      throw new AppError('Password incorrect');
    }

    return room;
  }
}
