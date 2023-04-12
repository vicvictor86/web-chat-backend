import { RolesEnum } from '../infra/typeorm/enums/RolesEnum';

export default interface ICreateRolesRoomsDTO {
  userId: string;

  roomId: string;

  role: RolesEnum;
}
