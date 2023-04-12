import "reflect-metadata";
import { serverHttp } from "./http";
import { io } from "./socket";

import "@shared/infra/typeorm";
import "@shared/container";

import ConnectionUserRoomController from "@modules/rooms/infra/websocket/controllers/ConnectionUserRoomController";
import RoomsController from "@modules/rooms/infra/websocket/controllers/RoomsController";
import MessagesController from "@modules/message/infra/websocket/controllers/MessagesController";

const connectionUserRoomController = new ConnectionUserRoomController();
const roomsController = new RoomsController();
const messagesController = new MessagesController();

io.on('connection', (socket) => {
  console.log('A client connected.');

  socket.emit('connected', 'You are connected.');

  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });

  socket.on("select_room", async (data, callback) => await connectionUserRoomController.create(data, { io, socket, callback }));

  socket.on("kick_user", async (data, callback) => await connectionUserRoomController.delete(data, { io, socket, callback }));

  socket.on("connections_room", async (data, callback) => await connectionUserRoomController.index(data, { io, socket, callback }));

  socket.on("disconnect", async data => await connectionUserRoomController.update({ io, socket }));

  socket.on("delete_room", async (data, callback) => await roomsController.delete(data, { io, socket, callback }));

  socket.on("update_room", async (data, callback) => await roomsController.update(data, { io, socket, callback }));

  socket.on("message", (data, callback) => messagesController.create(data, {io, socket, callback}));

  socket.on("previous_messages", (data, callback) => messagesController.index(data, {io, socket, callback}));
});

serverHttp.listen(3333, () => console.log("Server is running on PORT 3333"));