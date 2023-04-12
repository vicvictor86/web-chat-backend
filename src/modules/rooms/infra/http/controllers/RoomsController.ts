import { container } from "tsyringe";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

import CreateRoomService from "@modules/rooms/services/CreateRoomService";
import ShowRoomService from "@modules/rooms/services/ShowRoomService";
import IndexRoomService from "@modules/rooms/services/IndexRoomService";

export default class RoomsController {
  public async create(request: Request, response: Response) {
    const { name, userLimit, password } = request.body;
    const userId = request.user.id;
    
    const createRoomService = container.resolve(CreateRoomService);

    const room = await createRoomService.execute({ name, userLimit, password, userId });

    return response.status(200).json(instanceToInstance(room));
  }

  public async show(request: Request, response: Response) {
    const showRoomService = container.resolve(ShowRoomService);

    const rooms = await showRoomService.execute();

    return response.status(200).json(instanceToInstance(rooms));
  }

  public async index(request: Request, response: Response) {
    const id = request.params.id;

    const indexRoomService = container.resolve(IndexRoomService);

    const rooms = await indexRoomService.execute(id);

    return response.status(200).json(instanceToInstance(rooms));
  }
}