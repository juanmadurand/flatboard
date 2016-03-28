import * as HttpStatus from 'http-status-codes';

export class APIError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor.name);
    this.statusCode = statusCode;
  }
}

export class NotFound extends APIError {
  constructor(message = 'Not Found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class BadRequest extends APIError {
  constructor(message = 'Bad Request') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class ValidationError extends APIError {
  constructor(message = 'Validation failed') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class Conflict extends APIError {
  constructor(message = 'Conflict') {
    super(HttpStatus.CONFLICT, message);
  }
}

export class Unauthorized extends APIError {
  constructor(message = 'Unauthorized') {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

export class ImATeapot extends APIError {
  constructor() {
    super(418, "I'm a teapot");
  }
}
