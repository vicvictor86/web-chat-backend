export default interface IUpdateRoomDTO {
  room_id: string;

  name: string;

  user_limit: number;

  is_private: boolean;

  password: string | undefined;
}
