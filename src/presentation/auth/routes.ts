import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    //definir todas las rutas principales

    router.post('/register', controller.registerUser);
    router.post('/login', AuthMiddleware.validateJWT, controller.loginUser);
    router.get('/', AuthMiddleware.validateJWT, controller.getUsers);

    return router;
  }
}
