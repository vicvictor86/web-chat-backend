import { io } from "@shared/infra/http/http";
import RoomsController from "../controllers/RoomsController";

const roomsController = new RoomsController();

io.on("connection", socket => {
  socket.on("delete_room", async (data, callback) => await roomsController.delete(data, { io, socket, callback }));
  socket.on("update_room", async (data, callback) => await roomsController.update(data, { io, socket, callback }));
})