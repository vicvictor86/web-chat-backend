import IMessagesRepository from "@modules/message/repositories/IMessagesRepository";
import { inject, injectable } from "tsyringe";
import ISocketInformationDTO from "../../../shared/dtos/ISocketInformationDTO";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
  socket_id: string;

  username: string;

  room: string;

  socketInformation: ISocketInformationDTO;
}

@injectable()
export default class CreateUserService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,
  ){}

  public async execute({socket_id, username, room, socketInformation}: Request): Promise<User> {
    const { io, socket, callback } = socketInformation;

    socket.join(room);

    const userInRoom = await this.usersRepository.findUserInRoom(username, room);

    let user: User;
    if (userInRoom) {
      user = await this.usersRepository.save({
        ...userInRoom,
        socket_id: socket.id,
      })
    } else {
      user = await this.usersRepository.create({
        socket_id: socket.id,
        username: username,
        room: room,
      });
    }

    const userMessages = await this.messagesRepository.findByRoom(room);
    callback(userMessages);

    return user;
  }
}