import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnAuthorizedError,
} from "./error.js";
import { respondWithError } from "./json.js";

export const middlewareErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let code;
  let msg = err.message;
  if (err instanceof BadRequestError) {
    code = 400;
  } else if (err instanceof UnAuthorizedError) {
    code = 401;
  } else if (err instanceof ForbiddenError) {
    code = 403;
  } else if (err instanceof NotFoundError) {
    code = 404;
  } else {
    code = 500;
    msg = "Internal Server Error";
  }

  respondWithError(res, code, msg);
  next();
};
