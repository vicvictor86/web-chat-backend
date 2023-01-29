import ensureAuthenticate from "@modules/users/infra/http/middlewares/ensureAuthenticate";
import { Router } from "express";
import RoomsController from "../controllers/RoomsController";

const roomsRouter = Router();
const roomsController = new RoomsController();

roomsRouter.post('/', ensureAuthenticate, roomsController.create);
roomsRouter.get('/', roomsController.show);
roomsRouter.get('/:id', roomsController.index);
// roomsRouter.patch('/:id', ensureAuthenticate, roomsController.update);

export default roomsRouter;
