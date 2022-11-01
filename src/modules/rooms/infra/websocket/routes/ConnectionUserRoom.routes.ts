import { io } from "@shared/infra/http/http";
import ConnectionUserRoomController from "../controllers/ConnectionUserRoomController";

const connectionUserRoomController = new ConnectionUserRoomController();

io.on("connection", socket => {
  socket.on("select_room", (data, callback) => connectionUserRoomController.create(data, { io, socket, callback }));
})