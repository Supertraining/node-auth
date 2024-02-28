import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  statusCode: number;
}
export class ErrorHandler {
  static errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('ERROR_HANDLER:', err);
      const errorStatus = err.statusCode || 500;
      const errorMessage = err.message || 'Internal server error';

      const additionalInfo = {
        route: req.originalUrl,
        method: req.method,
        ip: req.ip,
        // user_agent: req.header[ 'user-agent' ],
        user: req.body.user,
      };
      // console.error(err, additionalInfo);
      res.status(errorStatus).send(errorMessage);
    } catch (error) {
      console.error(error);
    }
  };
}
