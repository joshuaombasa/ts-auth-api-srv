import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidationError } from '../errors/request-validation-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middleware/validate-request';

import { User } from '../models/user';

const signupRouter = express.Router();

signupRouter.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(
        'Password must have a length of between 4 and 20 characters.'
      ),
  ],
  validateRequest,
  async (request: Request, response: Response) => {

    const { email, password } = request.body;

    await User.deleteMany({})

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const userObject = User.build({ email, password });
    const savedUser = await userObject.save();

    const jwtToken = jwt.sign(
      {
        id: savedUser._id.toString(),
        email: savedUser.email,
      },
      'asdf'
    );

    request.session = { jwt: jwtToken };

    response.status(201).send(savedUser);
  }
);

export { signupRouter };
