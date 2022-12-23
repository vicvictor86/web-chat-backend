import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import IRoomsRepository from "../repositories/IRoomsRepository";
import authConfig from "@config/auth";
import Room from "../infra/typeorm/entities/Room";

interface Request {
  room_id: string;

  password: string;
}

@injectable()
export default class AuthenticatePrivateRoomAccessService {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
  ){}

  public async execute({ room_id, password }: Request): Promise<Room>{
    const room = await this.roomsRepository.findById(room_id);

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
