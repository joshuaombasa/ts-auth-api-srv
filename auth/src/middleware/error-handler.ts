import express, { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { CustomError } from '../errors/custom-error';

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return response
      .status(error.statusCode)
      .send({ errors: error.serializeError() });
  }

  response.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};

export { errorHandler };
