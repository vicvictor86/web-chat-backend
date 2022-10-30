import { io } from "@shared/infra/http/http";
import WebSocketUserController from "../controllers/WebSocketUserController";

const webSocketUserController = new WebSocketUserController();

io.on("connection", socket => {
  socket.on("select_room", (data, callback) => webSocketUserController.create(data, { io, socket, callback }));
})