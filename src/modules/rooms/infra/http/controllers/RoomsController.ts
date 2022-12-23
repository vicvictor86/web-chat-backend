import { container } from "tsyringe";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

import CreateRoomService from "@modules/rooms/services/CreateRoomService";
import ShowRoomService from "@modules/rooms/services/ShowRoomService";
import IndexRoomService from "@modules/rooms/services/IndexRoomService";
import UpdateRoomService from "@modules/rooms/services/UpdateRoomService";

export default class RoomsController {
  public async create(request: Request, response: Response) {
    const { name, user_limit, password } = request.body;
    const user_id = request.user.id;
    
    const createRoomService = container.resolve(CreateRoomService);

    const room = await createRoomService.execute({ name, user_limit, password, user_id });

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

  public async update(request: Request, response: Response) {
    const room_id = request.params.id;
    const user_id = request.user.id;
    const { newRoomName, newRoomPassword, newRoomUserLimit, is_private } = request.body;

    const updateRoomService = container.resolve(UpdateRoomService);

    const room = await updateRoomService.execute({ room_id,user_id, newRoomName, newRoomPassword, newRoomUserLimit, is_private });

    return response.status(200).json(instanceToInstance(room));
  }
}