export default interface ICreateConnectionUserRoomDTO {
  user_id: string;

  room_id: string;

  socket_id: string;

  is_on_chat: boolean;
}
