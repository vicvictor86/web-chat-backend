import messagesRouter from '@modules/message/infra/http/routes/messages.routes';
import privateRoomsRouter from '@modules/rooms/infra/http/routes/privateRooms.routes';
import roomsRouter from '@modules/rooms/infra/http/routes/rooms.routes';
import roomsByUserRouter from '@modules/rooms/infra/http/routes/roomsByUser.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use("/user", userRouter);
routes.use("/login", sessionsRouter);
routes.use("/rooms", roomsRouter);
routes.use("/rooms/user", roomsByUserRouter);
routes.use("/messages", messagesRouter);
routes.use("/rooms/private", privateRoomsRouter)

export default routes;

