import Messages from '../entities/Messages';
import { connectionSource } from '@shared/infra/typeorm/index';

import IMessagesRepository from '@modules/message/repositories/IMessagesRepository';
import ICreateMessageDTO from '@modules/message/dtos/ICreateMessageDTO';

const messagesRepository = connectionSource.getRepository(Messages);

export const MessagesRepository: IMessagesRepository = messagesRepository.extend({
  async findById(id: string): Promise<Messages | null> {
    const message = await messagesRepository.findOne({
      where: {
        id
      }
    });

    return message;
  },

  async findByUsername(username: string): Promise<Messages | null> {
    const message = await messagesRepository.findOne({
      where: {
        username
      }
    });

    return message;
  },

  async findByRoom(room: string): Promise<Messages[] | null> {
    const message = await messagesRepository.find({
      where: {
        room
      }
    });

    return message;
  },
  
  async create(messageData: ICreateMessageDTO): Promise<Messages> {
    const message = messagesRepository.create(messageData);

    await messagesRepository.save(message);

    return message;
  },

  async save(message: Messages): Promise<Messages> {
    return await messagesRepository.save(message);
  },

})