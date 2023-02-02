import { io } from "@shared/infra/http/http";
import ensureAuthenticateWebSocket from "@modules/users/infra/http/middlewares/ensureAuthenticateWebSocket";
import MessagesController from "../controllers/MessagesController";

const messagesController = new MessagesController();

io.use((socket, next) => {
  const { token } = socket.handshake.auth;

  ensureAuthenticateWebSocket(token);

  return next();
});

io.on("connection", socket => {
  socket.on("message", (data, callback) => messagesController.create(data, {io, socket, callback}));
  socket.on("previous_messages", (data, callback) => messagesController.index(data, {io, socket, callback}));
})