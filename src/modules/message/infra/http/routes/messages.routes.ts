import { Router } from "express";
import MessagesController from "../controllers/MessagesController";

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.get('/:id', messagesController.show);

export default messagesRouter;
