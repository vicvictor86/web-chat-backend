import { Router } from "express";
import RoomsController from "../controllers/RoomsController";

const roomsRouter = Router();
const roomsController = new RoomsController();

roomsRouter.post('/', roomsController.create);

export default roomsRouter;