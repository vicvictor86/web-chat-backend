import { Router } from "express";
import PrivateRoomsController from "../controllers/PrivateRoomsController";

const privateRoomsRouter = Router();
const privateRoomsController = new PrivateRoomsController();

privateRoomsRouter.post('/', privateRoomsController.show);

export default privateRoomsRouter;
