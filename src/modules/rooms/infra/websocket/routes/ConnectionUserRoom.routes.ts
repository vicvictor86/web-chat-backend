import { io } from "@shared/infra/http/http";
import ConnectionUserRoomController from "../controllers/ConnectionUserRoomController";

const connectionUserRoomController = new ConnectionUserRoomController();

io.on("connection", socket => {
  socket.on("select_room", async (data, callback) => await connectionUserRoomController.create(data, { io, socket, callback }));
  socket.on("disconnect_room", async (data, callback) => await connectionUserRoomController.update(data, { io, socket, callback }));
})