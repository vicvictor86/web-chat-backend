import Message from "../repositories/entities/Message";

interface Request {
  username: string;

  text: string;

  room: string;
}

export default class CreateMessageService {
  public execute(data: Request): Message {
    const message = new Message();
    message.id = data.username;
    message.text = data.text;
    message.room = data.room;
    message.username = data.username;
    message.createdAt = new Date();

    return message;
  }
}