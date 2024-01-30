import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { userRoutes } from "./user/routes";

export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    //definir todas las rutas principales

    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/user', userRoutes.routes)

    return router;

  }

}