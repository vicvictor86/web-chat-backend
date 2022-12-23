import { container } from "tsyringe";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import IndexRoomUserService from "@modules/rooms/services/IndexRoomUserService";

export default class RoomsUserController {
  public async index(request: Request, response: Response) {
    const id = request.params.id;

    const indexRoomService = container.resolve(IndexRoomUserService);

    const rooms = await indexRoomService.execute(id);

    return response.status(200).json(instanceToInstance(rooms));
  }
}