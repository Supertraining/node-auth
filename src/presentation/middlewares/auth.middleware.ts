import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import { CustomError } from '../../domain';

export class AuthMiddleware {
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.header('Authorization');
      if (!authorization) throw CustomError.unauthorized('No token provided');
      if (!authorization.startsWith('Bearer '))
        throw CustomError.unauthorized('Invalid Bearer token');

      const token = authorization.split(' ').at(1) || '';

      const payload = await JwtAdapter.validateToken<{ id: string; roles: Array<string> }>(token);
      if (!payload) throw CustomError.unauthorized('Invalid token');

      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(401).json({ error: 'Invalid token - user not found' });

      req.body.user = user;

      next();
    } catch (error) {
      if (error instanceof CustomError) {
        next(error);
      } else {
        next(CustomError.internalError());
      }
    }
  };

  static validateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.header('Authorization');
      if (!authorization) throw CustomError.unauthorized('No token provided');
      if (!authorization.startsWith('Bearer '))
        throw CustomError.unauthorized('Invalid Bearer token');

      const token = authorization.split(' ').at(1) || '';

      const payload = await JwtAdapter.validateToken<{ id: string; roles: Array<string> }>(token);
      if (!payload) throw CustomError.unauthorized('Invalid token');
      const {
        roles: [role],
      } = payload;
      if (role !== 'ADMIN_ROLE') throw CustomError.forbidden('Access denied');

      next();
    } catch (error) {
      console.log('ERROR EN AUTH MIDDLE:', error);
      if (error instanceof CustomError) {
        next(error);
      } else {
        next(CustomError.internalError());
      }
    }
  };
}
