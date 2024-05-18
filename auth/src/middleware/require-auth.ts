import express, { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

const requireAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.currentUser) {
    throw new NotAuthorizedError();
  }
};

export { requireAuth };
