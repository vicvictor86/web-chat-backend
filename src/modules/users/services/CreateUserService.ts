import IMessagesRepository from "@modules/message/repositories/IMessagesRepository";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
  username: string;

  email: string;

  password: string;
}

@injectable()
export default class CreateUserService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ){}

  public async execute({username, email, password}: Request): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if(userExists) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }
}