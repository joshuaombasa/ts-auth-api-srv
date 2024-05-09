import { CustomError } from './custom-error';

class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}

export { BadRequestError };
