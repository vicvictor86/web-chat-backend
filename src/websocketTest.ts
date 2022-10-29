import { io } from "../src/shared/infra/http/http";

io.on("connection", socket => {
  console.log("connection");
  socket.on("message", data => {
    console.log(data);
  })

  socket.on("select_room", data => {
    console.log("select_room");
  })
})