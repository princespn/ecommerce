import { StatusCodes } from "http-status-codes";
/**
 * Custom error class that represet the any error in the code;
 */
export default class ApiError extends Error {
  constructor(message, statusCode, path) {
    super(message ?? "Bad Request");
    this.message = message ?? "Bad Request";
    this.statusCode = statusCode ?? StatusCodes.BAD_REQUEST;
    this.path = `/api/v1/${path}`;
    this.timestamp = new Date();

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
