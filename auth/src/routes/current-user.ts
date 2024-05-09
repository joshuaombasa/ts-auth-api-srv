import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middleware/current-user';

const currentUserRouter = express.Router();

currentUserRouter.get(
  '/api/users/currentuser',
  currentUser,
  async (request: Request, response: Response) => {
    response.send({ currentUser: request.currentUser || null });
  }
);

export { currentUserRouter };
