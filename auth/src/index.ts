// import express from 'express';
// import 'express-async-errors';
// import mongoose from 'mongoose';
// import cookieSession from 'cookie-session';
// import cors from 'cors';

// const PORT = 3000;

// import { currentUserRouter } from './routes/current-user';
// import { signupRouter } from './routes/signup';
// import { errorHandler } from './middleware/error-handler';
// import { NotFoundError } from './errors/not-found-error';
// import { signinRouter } from './routes/signin';
// import { signoutRouter } from './routes/signout';


// const PORT = 4000;

// const app = express();

// app.set('trust proxy', true)

// app.use(cookieSession({
//   secure: false,
//   signed:false
// }))

// app.use(express.json());

// app.use(signupRouter);
// app.use(signinRouter);
// app.use(signoutRouter);
// app.use(currentUserRouter);

// app.all('*', (request: Request, response: Response) => {
//   throw new NotFoundError('Uknown endpoint');
// });

// app.use(errorHandler);

// const start = async () => {
//   try {
//     await mongoose.connect(
//       'mongodb://127.0.0.1:27017/auth4?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1'
//     );
//   } catch (error) {
//     console.error(error);
//   }

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// };

// start()

import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import cors from 'cors';

const PORT = 4000;

import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler, NotFoundError } from '@jotiketi/common';



const app = express();

// Enable trust proxy if behind a proxy like Nginx
app.set('trust proxy', true);

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));

app.use(cookieSession({
  name: 'session',
  secure: false, // Set to true in production
  signed: false,
}));

app.use(express.json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', () => {
  throw new NotFoundError('Uknown endpoint');
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb://127.0.0.1:27017/auth4?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1'
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();