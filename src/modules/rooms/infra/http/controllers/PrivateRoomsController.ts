import { container } from "tsyringe";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import AuthenticatePrivateRoomAccessService from "@modules/rooms/services/AuthenticatePrivateRoomAccessService";

export default class PrivateRoomsController {
  public async show(request: Request, response: Response) {
    const { password, roomId } = request.body;

    const authenticatePrivateRoomAccessService = container.resolve(AuthenticatePrivateRoomAccessService);

    const room = await authenticatePrivateRoomAccessService.execute({password, roomId});

    return response.status(200).json(instanceToInstance(room));
  }
}