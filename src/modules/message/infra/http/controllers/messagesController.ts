import { Request, Response } from "express";
import Message from "../../../repositories/entities/Message";
import CreateMessageService from "../../../services/CreateMessageService";

const messages: Message[] = [];

export default class MessagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, text, room } = request.body;

    const createMessageService = new CreateMessageService();

    const message = createMessageService.execute({username, text, room});
    messages.push(message);

    return response.status(200).json(message);
  }
}