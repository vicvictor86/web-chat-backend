export default interface ICreateRoomDTO {
  name: string;

  user_limit: number;

  is_private: boolean;

  password: string | undefined;
}
