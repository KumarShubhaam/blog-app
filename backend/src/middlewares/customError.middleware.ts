import type {Request, Response, NextFunction } from 'express';
import Log from './logger.middleware.js';

export class AppError extends Error {
  status_code: number;
  msg: string;

  constructor(status: number, msg: string){
    super();
    this.status_code = status;
    this.msg = msg;
  }
}

let logger = new Log('HandleAppError');

const HandleAppError = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError){
    logger.error(err.msg);
    return res.status(err.status_code).send({msg: err.msg})
  }
  logger.error('Internal Server Error');
  return res.status(500).send({msg: 'Internal Server Error'});
}

export default HandleAppError;

