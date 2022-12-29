import CreateUserService from "../../../services/CreateUserService";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

export default class UsersController {
  public async create(request: Request, response: Response){
    const {username, email, password} = request.body;

    const createUserService = container.resolve(CreateUserService);
    
    const user = await createUserService.execute({ username, email, password });

    return response.status(200).json(instanceToInstance(user));
  }
}