import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserController } from './controller';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../infrastructure';

export class userRoutes {
  static get routes(): Router {
    const router = Router();

    const dataSourse = new UserDatasourceImpl();

    const userRepository = new UserRepositoryImpl(dataSourse)

    const controller = new UserController(userRepository);

    router.get('/', AuthMiddleware.validateRole, controller.getUsers);

    return router;
  }
}
