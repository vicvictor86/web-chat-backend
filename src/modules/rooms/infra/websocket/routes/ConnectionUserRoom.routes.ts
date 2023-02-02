import { io } from "@shared/infra/http/http";
import ensureAuthenticateWebSocket from "@modules/users/infra/http/middlewares/ensureAuthenticateWebSocket";
import ConnectionUserRoomController from "../controllers/ConnectionUserRoomController";

const connectionUserRoomController = new ConnectionUserRoomController();

io.use((socket, next) => {
  const { token } = socket.handshake.auth;

  ensureAuthenticateWebSocket(token);

  return next();
});

io.on("connection", socket => {
  socket.on("select_room", async (data, callback) => await connectionUserRoomController.create(data, { io, socket, callback }));
  socket.on("kick_user", async (data, callback) => await connectionUserRoomController.delete(data, { io, socket, callback }));
  socket.on("connections_room", async (data, callback) => await connectionUserRoomController.index(data, { io, socket, callback }));
  socket.on("disconnect", async data => await connectionUserRoomController.update({ io, socket }));
})