import { container } from "tsyringe";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import ShowMessagesService from "@modules/message/services/ShowMessagesService";

export default class MessagesController {
  public async show(request: Request, response: Response) {
    const { roomId } = request.body;

    const showMessagesService = container.resolve(ShowMessagesService);

    const messages = await showMessagesService.execute(roomId);

    return response.status(200).json(instanceToInstance(messages));
  }
}