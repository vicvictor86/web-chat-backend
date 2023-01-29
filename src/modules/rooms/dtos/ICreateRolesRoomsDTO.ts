import { RolesEnum } from '../infra/typeorm/enums/RolesEnum';

export default interface ICreateRolesRoomsDTO {
  user_id: string;

  room_id: string;

  role: RolesEnum;
}
