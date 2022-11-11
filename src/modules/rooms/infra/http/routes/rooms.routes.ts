import ensureAuthenticate from "@modules/users/infra/http/middlewares/ensureAuthenticate";
import { Router } from "express";
import RoomsController from "../controllers/RoomsController";

const roomsRouter = Router();
const roomsController = new RoomsController();

roomsRouter.post('/', ensureAuthenticate, roomsController.create);
roomsRouter.get('/',  roomsController.show);

export default roomsRouter;
