import "reflect-metadata";
import { serverHttp, io } from "./http";

import "@modules/message/infra/websocket/routes/message.routes";
import "@modules/rooms/infra/websocket/routes/ConnectionUserRoom.routes";
import "@modules/rooms/infra/websocket/routes/rooms.routes";

import "@modules/users/infra/http/routes/user.routes";

import "@shared/infra/typeorm";
import "@shared/container";

serverHttp.listen(3333, () => console.log("Server is running on PORT 3333"));