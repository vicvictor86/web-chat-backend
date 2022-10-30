import express from "express";
import http from "http";
import { Server } from "socket.io";
import routes from "./routes/index";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "http://localhost:3000"
  }
});


export { serverHttp, io };