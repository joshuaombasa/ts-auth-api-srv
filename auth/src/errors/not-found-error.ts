import { CustomError } from './custom-error';

class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(public message: string) {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}

export { NotFoundError };
