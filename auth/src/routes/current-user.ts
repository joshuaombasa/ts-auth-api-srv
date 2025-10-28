import express, { Request, Response } from 'express';
import { currentuser } from '@jotiketi/common';

interface CurrentUserRequest extends Request {
  currentUser?: {
    id: string;
    email: string;
  };
}

const currentUserRouter = express.Router();

currentUserRouter.get(
  '/api/users/currentuser',
  currentuser,
  async (req: CurrentUserRequest, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { currentUserRouter };
