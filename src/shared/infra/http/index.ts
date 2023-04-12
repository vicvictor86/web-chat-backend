import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';

import http from "http";

import routes from "./routes/index";
import cors from "cors";
import multer from "multer";

import AppError from '@shared/errors/AppError'

const app = express();

const corsOptions = {
  origin: "*",
}

app.use(multer().none());
app.use(express.json());
app.use(cors(corsOptions));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err.stack);
  console.log(err.message);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
})

const serverHttp = http.createServer(app);

export { serverHttp };