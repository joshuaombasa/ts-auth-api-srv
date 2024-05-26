import express, { Request, Response } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@joshuaombasateeketi/common1';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const PORT = 4001;

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(indexTicketRouter)
app.use(showTicketRouter);
app.use(updateTicketRouter)

app.all('*', (request: Request, response: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb://127.0.0.1:27017/tiketi8-tickets?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1`
    );
    console.log('connected to mongodb');
  } catch (error) {
    console.log(error);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
