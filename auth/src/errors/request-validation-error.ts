import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return this.errors.map((error) => ({ message: error.msg }));
  }
}

export { RequestValidationError };
