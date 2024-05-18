import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((error) => ({
      message: error.msg,
    }));
  }
}

export { RequestValidationError };