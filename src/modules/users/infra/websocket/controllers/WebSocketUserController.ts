import ISocketInformationDTO from "../../../../../shared/dtos/ISocketInformationDTO";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import CreateUserService from "../../../services/CreateUserService";
import { container } from "tsyringe";

export default class WebSocketUsersController {
  public async create(data: ICreateUserDTO, socketInformation: ISocketInformationDTO): Promise<void> {
    const { username, email, password } = data;
    
    console.log(data);

    // const createUserService = container.resolve(CreateUserService);
    
    // const user = createUserService.execute({ username, email, password, socketInformation });
  }

  public async delete(username: string, room: string, connectionMessage: string, socketInformation: ISocketInformationDTO): Promise<void> {
    
  }
}