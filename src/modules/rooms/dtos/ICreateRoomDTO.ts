export default interface ICreateRoomDTO {
  name: string;

  userLimit: number;

  isPrivate: boolean;

  password: string | undefined;
}
