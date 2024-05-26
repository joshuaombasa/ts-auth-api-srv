import { requireAuth, validateRequest } from '@joshuaombasateeketi/common1';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket, build } from '../models/ticket';

const createTicketRouter = express.Router();

createTicketRouter.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must ne grater than 0'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { title, price } = request.body;

    const userId = request.currentUser!.id;

    const ticketObject = build({ title, price, userId });

    const savedTicket = await ticketObject.save();

    response.status(201).send(savedTicket);
  }
);

export { createTicketRouter };
