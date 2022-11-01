import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateService from '@modules/users/services/AuthenticateService';
import { instanceToInstance } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateService = container.resolve(AuthenticateService);

    const { user, token } = await authenticateService.execute({ username, password });

    const userWithoutPassword = instanceToInstance(user);

    return response.status(200).json({ user: userWithoutPassword, token });
  }
}
