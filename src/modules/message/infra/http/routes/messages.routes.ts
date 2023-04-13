import { Router } from "express";
import MessagesController from "../controllers/MessagesController";

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.get('/:roomId', messagesController.show);

export default messagesRouter;
