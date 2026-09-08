import ApiError from "../error/ApiError.js";
import { StatusCodes } from "http-status-codes";

/**
 * Global error handler if you throw any error in sync method it will be received here
 * async methods will also work because of the import "express-async-errors";
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const errorHandler = (err, req, res, next) => {
  // //TODO: need to format the zod thrown errors
  // if (err instanceof ZodError) {
  // 	const zodError = JSON.parse(err.message);
  // 	return res.status(StatusCodes.BAD_REQUEST).json({
  // 		statusCode: StatusCodes.BAD_REQUEST,
  // 		message: zodError,
  // 		timestamp: new Date()
  // 	});
  // }

  console.log(err);

  //for custom thrown errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err,
      path: err.path,
      timestamp: new Date(),
    });
  }

  //for server errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message ?? "Internal error",
    path: "/api/v1",
    timestamp: new Date(),
  });
};
