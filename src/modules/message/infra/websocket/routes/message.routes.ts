import { io } from "@shared/infra/http/http";
import MessagesController from "../controllers/MessagesController";

const messagesController = new MessagesController();

io.on("connection", socket => {
  socket.on("message", (data, callback) => messagesController.create(data, {io, socket, callback}));
  socket.on("previous_messages", (data, callback) => messagesController.index(data, {io, socket, callback}));
})