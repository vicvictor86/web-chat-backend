import { Server, Socket } from "socket.io";

export default interface ISocketInformationDTO {
  io: Server;
  
  socket: Socket; 

  callback?: any;
}