import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import { Router } from 'express';

const routes = Router();

// routes.use("/messages", messagesRouter);
routes.use("/user", userRouter);
routes.use("/login", sessionsRouter);

export default routes;

