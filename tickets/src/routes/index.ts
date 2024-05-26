import {
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@joshuaombasateeketi/common1';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const indexTicketRouter = express.Router();

indexTicketRouter.get(
  '/api/tickets',
  async (request: Request, response: Response) => {
    const tickets = await Ticket.find({});

    response.send(tickets);
  }
);

export { indexTicketRouter };
