import { CustomError } from "./custom-error";

class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to database';
  statusCode = 500;

  constructor() {
    super('Error connecting to database');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [{ message: this.reason }];
  }
}

export { DatabaseConnectionError };
