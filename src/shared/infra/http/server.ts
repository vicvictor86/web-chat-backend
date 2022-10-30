import "reflect-metadata";
import { serverHttp, io } from "./http";
import "../../../modules/message/infra/websocket/routes/message.socket";
import "../../../modules/users/infra/websocket/routes/user.socket";

import "@shared/infra/typeorm";
import "@shared/container";

serverHttp.listen(3333, () => console.log("Server is running on PORT 3333"));