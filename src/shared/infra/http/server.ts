import { serverHttp, io } from "./http";

io.on("connection", socket => {
  console.log("connection");
  socket.on("message", data => {
    console.log(data);
  });

  socket.on("select_room", data => {
    console.log("select_room");
  });
});

serverHttp.listen(3333, () => console.log("Server is running on PORT 3333"));