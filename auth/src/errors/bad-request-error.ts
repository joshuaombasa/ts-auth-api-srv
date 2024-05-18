import { CustomError } from './custom-error';

class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super();

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}

export { BadRequestError };
