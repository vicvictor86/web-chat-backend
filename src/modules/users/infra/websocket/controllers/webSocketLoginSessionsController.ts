import ISocketInformationDTO from "../../../../../shared/dtos/ISocketInformationDTO";
import ICreateLoginSessionsDTO from "../../../dtos/ICreateLoginSessionsDTO";
import AuthenticateService from "../../../services/AuthenticateService";
import { container } from "tsyringe";

export default class WebSocketUsersController {
  public async create(data: ICreateLoginSessionsDTO, socketInformation: ISocketInformationDTO): Promise<void> {
    const { email, password } = data;
    
    const authenticateService = container.resolve(AuthenticateService);
    
    await authenticateService.execute({ email, password });
  }

  public async delete(username: string, room: string, connectionMessage: string, socketInformation: ISocketInformationDTO): Promise<void> {
    
  }
}