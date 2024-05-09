import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';

import jwt from 'jsonwebtoken';
import { Password } from '../services/password';

import { validateRequest } from '../middleware/validate-request';

import { User } from '../models/user';

const signinRouter = express.Router();

signinRouter.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('password must be provided'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const isPasswordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!isPasswordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const jwtToken = jwt.sign(
      {
        id: existingUser._id.toString(),
        email: existingUser.email,
      },
      'asdf'
    );

    request.session = { jwt: jwtToken };

    response.status(200).send(existingUser);

  }
);

export { signinRouter };
