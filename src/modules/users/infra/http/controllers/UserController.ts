import ISocketInformationDTO from "../../../../../shared/dtos/ISocketInformationDTO";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import CreateUserService from "../../../services/CreateUserService";
import { container } from "tsyringe";
import { Request, Response } from "express";

export default class UsersController {
  public async create(request: Request, response: Response){
    const {username, email, password} = request.body;

    const createUserService = container.resolve(CreateUserService);
    
    const user = createUserService.execute({ username, email, password });

    return response.status(200).json({username, email});
  }

  public async delete(username: string, room: string, connectionMessage: string, socketInformation: ISocketInformationDTO): Promise<void> {
    
  }
}