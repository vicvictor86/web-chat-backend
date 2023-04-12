export default interface IUpdateRoomDTO {
  roomId: string;

  name: string;

  userLimit: number;

  isPrivate: boolean;

  password: string | undefined;
}
