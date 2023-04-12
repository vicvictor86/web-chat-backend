import ensureAuthenticateWebSocket from "@modules/users/infra/http/middlewares/ensureAuthenticateWebSocket";
import { Server } from "socket.io";
import { serverHttp } from "../http";

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  }
});

io.use((socket, next) => {
  const { token } = socket.handshake.auth;

  ensureAuthenticateWebSocket(token);

  return next();
});

export { io };