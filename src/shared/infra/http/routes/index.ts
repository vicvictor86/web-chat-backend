import userRouter from '@modules/users/infra/http/routes/user.routes';
import { Router } from 'express';

const routes = Router();

// routes.use("/messages", messagesRouter);
routes.use("/login", userRouter);

export default routes;

