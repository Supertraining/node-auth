import { NextFunction, Request, Response } from "express";

interface CustomError extends Error{
  statusCode: number
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('entro al handler')
  try {
    
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || 'Internal server error';

    const additionalInfo = {
      route: req.originalUrl,
      method: req.method,
      ip: req.ip,
      // user_agent: req.header[ 'user-agent' ],
      user: req.body.user
    };
    console.error(err, additionalInfo);
    res.status(errorStatus).send(errorMessage);
    
  } catch (error) {

    console.error(error)
    
  }
};

export default errorHandler;