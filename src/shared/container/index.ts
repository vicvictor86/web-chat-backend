import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IMessagesRepository from '@modules/message/repositories/IMessagesRepository';
import { MessagesRepository } from '@modules/message/infra/typeorm/repositories/MessagesRepository';

container.registerInstance<IUsersRepository>('UsersRepository', UsersRepository);

container.registerInstance<IMessagesRepository>('MessagesRepository', MessagesRepository);