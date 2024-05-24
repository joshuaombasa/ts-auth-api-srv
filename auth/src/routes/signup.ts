import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@jotiketi/common';
import { User, addUser } from '../models/user';
import { Password } from '../services/password';

const signupRouter = express.Router();

signupRouter.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must have a length of 4 to 20 characters'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    await User.deleteMany({});

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('User with this email already exists');
    }

    const hashedPassword = await Password.toHash(password);

    const UserObject = addUser({ email, password: hashedPassword });

    const savedUser = await UserObject.save();

    const jwtToken = jwt.sign(
      {
        email: savedUser.email,
        id: savedUser.id,
      },
      'asdf'
    );

    request.session = { jwt: jwtToken };

    response.status(201).json({ savedUser });
  }
);

export { signupRouter };
