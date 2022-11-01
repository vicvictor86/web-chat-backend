import { container } from "tsyringe";
import { Request, Response } from "express";
import CreateRoomService from "@modules/rooms/services/CreateRoomService";

export default class RoomsController {
  public async create(request: Request, response: Response) {
    const { name, user_limit } = request.body;

    const createRoomService = container.resolve(CreateRoomService);

    const room = await createRoomService.execute({ name, user_limit });

    return response.status(200).json(room);
  }
}