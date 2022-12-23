import privateRoomsRouter from '@modules/rooms/infra/http/routes/privateRooms.routes';
import roomsRouter from '@modules/rooms/infra/http/routes/rooms.routes';
import roomsUserRouter from '@modules/rooms/infra/http/routes/roomsUser.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use("/user", userRouter);
routes.use("/login", sessionsRouter);
routes.use("/rooms", roomsRouter);
routes.use("/rooms/user", roomsUserRouter);
routes.use("/rooms/private", privateRoomsRouter)

export default routes;

