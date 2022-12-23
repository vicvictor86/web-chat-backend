import { Router } from "express";
import RoomsUserController from "../controllers/RoomsUserController";

const roomsUserRouter = Router();
const roomsUserController = new RoomsUserController();

roomsUserRouter.get('/:id', roomsUserController.index);

export default roomsUserRouter;
