import express, { Request, Response } from 'express';
import { currentuser } from '@jotiketi/common';

const currentUserRouter = express.Router();

currentUserRouter.get(
  '/api/users/currentuser',
  currentuser,
  async (request: Request, response: Response) => {

    response.send({currentuser: request.currentUser || null})
  }
);

export { currentUserRouter };
