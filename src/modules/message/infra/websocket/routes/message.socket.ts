import { io } from "@shared/infra/http/http";
import WebSocketMessagesController from "../controllers/WebSocketMessagesController";

const webSocketMessagesController = new WebSocketMessagesController();

io.on("connection", socket => {
  socket.on("message", (data, callback) => webSocketMessagesController.create(data, {io, socket, callback}));
})