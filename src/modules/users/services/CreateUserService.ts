import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
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
    const emailExists = await this.usersRepository.findByEmail(email);
    const usernameExists = await this.usersRepository.findByUsername(username);

    if(emailExists) {
      throw new AppError('Email already exists');
    }

    if(usernameExists) {
      throw new AppError('Username already exists')
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