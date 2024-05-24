import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@jotiketi/common';

import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const signinRouter = express.Router();

signinRouter.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be provided'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const isPasswordsMatch = await Password.compare(
      password,
      existingUser?.password
    );

    if (!isPasswordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    const jwtToken = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser.id,
      },
      'asdf'
    );

    request.session = { jwt: jwtToken };

    response.status(201).json({ existingUser });
  }
);

export { signinRouter };
