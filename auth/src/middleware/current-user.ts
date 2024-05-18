import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface UserPayload {
  email: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const currentuser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.session?.jwt) {
    return next();
  }

  const payload = jwt.verify(request.session.jwt, 'asdf') as UserPayload;
  request.currentUser = payload;

  next();
};

export { currentuser };
