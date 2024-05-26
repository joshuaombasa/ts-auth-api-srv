import {
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@joshuaombasateeketi/common1';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const showTicketRouter = express.Router();

showTicketRouter.get(
  '/api/tickets/:id',
  async (request: Request, response: Response) => {
    const ticket = await Ticket.findById(request.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    response.send(ticket);
  }
);

export { showTicketRouter };
