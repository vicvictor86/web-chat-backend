import { Router } from "express";
import RoomsUserController from "../controllers/RoomsUserController";

const roomsByUserRouter = Router();
const roomsUserController = new RoomsUserController();

roomsByUserRouter.get('/:id', roomsUserController.index);

export default roomsByUserRouter;
