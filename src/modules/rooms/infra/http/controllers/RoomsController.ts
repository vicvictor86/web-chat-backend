import { container } from "tsyringe";
import { Request, Response } from "express";
import CreateRoomService from "@modules/rooms/services/CreateRoomService";
import ShowRoomService from "@modules/rooms/services/ShowRoomService";

export default class RoomsController {
  public async create(request: Request, response: Response) {
    const { name, user_limit } = request.body;

    const createRoomService = container.resolve(CreateRoomService);

    const room = await createRoomService.execute({ name, user_limit });

    return response.status(200).json(room);
  }

  public async show(request: Request, response: Response) {
    const showRoomService = container.resolve(ShowRoomService);

    const rooms = await showRoomService.execute();

    return response.status(200).json(rooms);
  }
}