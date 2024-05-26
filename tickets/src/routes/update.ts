import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@joshuaombasateeketi/common1';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const updateTicketRouter = express.Router();

updateTicketRouter.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and greater than 0'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { title, price } = request.body;
    const ticket = await Ticket.findById(request.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== request.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({ title, price });

    await ticket.save();

    response.send(ticket);
  }
);

export { updateTicketRouter };
