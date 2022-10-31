import { io } from "@shared/infra/http/http";
import webSocketLoginSessionsController from "../controllers/webSocketLoginSessionsController";

const webSocketLoginSessionController = new webSocketLoginSessionsController();

io.on("connection", socket => {
  socket.on("login", (data, callback) => webSocketLoginSessionController.create(data, { io, socket, callback }));
})