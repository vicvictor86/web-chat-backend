import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IMessagesRepository from '@modules/message/repositories/IMessagesRepository';
import { MessagesRepository } from '@modules/message/infra/typeorm/repositories/MessagesRepository';

import IRoomsRepository from '@modules/rooms/repositories/IRoomsRepository';
import { RoomsRepository } from '@modules/rooms/infra/typeorm/repositories/RoomsRepository';

import IConnectionUserRoomRepository from '@modules/rooms/repositories/IConnectionUserRoomRepository';
import { ConnectionUserRoomRepository } from '@modules/rooms/infra/typeorm/repositories/ConnectionUserRoomRepository';

import IAdmRoomsRepository from '@modules/rooms/repositories/IAdmRoomsRepository';
import { AdmRoomsRepository } from '@modules/rooms/infra/typeorm/repositories/AdmRoomsRepository';

container.registerInstance<IUsersRepository>('UsersRepository', UsersRepository);

container.registerInstance<IMessagesRepository>('MessagesRepository', MessagesRepository);

container.registerInstance<IRoomsRepository>('RoomsRepository', RoomsRepository);

container.registerInstance<IConnectionUserRoomRepository>('ConnectionUserRoomRepository', ConnectionUserRoomRepository);

container.registerInstance<IAdmRoomsRepository>('AdmRoomsRepository', AdmRoomsRepository);