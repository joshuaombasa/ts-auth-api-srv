import { CustomError } from './custom-error';

class NotAuthorizedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super();

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: 'not authorized' }];
  }
}

export { NotAuthorizedError };
