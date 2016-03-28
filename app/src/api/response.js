import http from 'http';
import * as HttpStatus from 'http-status-codes';

function extractStatusCode(err: ?Error): number {
  if (err.statusCode) {
    return err.statusCode;
  }
  console.error(err.stack);
  return HttpStatus.INTERNAL_SERVER_ERROR;
}

export function success(res: http.ServerResponse, value, statusCode = 200) {
  res.status(statusCode).json(value);
}

export function error(res: http.ServerResponse, err: Error) {
  const statusCode = extractStatusCode(err);
  const response = Object.assign({}, {
    error: true,
    statusCode,
    reason: err.message,
  });

  if (err.requestErrors) {
    response.detail = err.requestErrors;
  }

  res.status(statusCode)
    .json(response);
}
