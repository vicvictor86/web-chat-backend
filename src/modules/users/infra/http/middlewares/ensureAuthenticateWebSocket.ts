import AppError from "@shared/errors/AppError";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

export default function ensureAuthenticateWebSocket(token: string): void {
  if(!token){
    throw new AppError('JSONWebToken required');
  }

  try {
    verify(token, authConfig.jwt.secret);
  } catch {
    throw new AppError('Invalid JSONWebToken');
  }
}
