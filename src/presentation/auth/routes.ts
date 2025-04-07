import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    /**
     * @openapi
     * /api/auth/register:
     *   post:
     *     summary: Registrar un nuevo usuario
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - email
     *               - password
     *               - roles
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               roles:
     *                 type: string
     *             example:
     *              name: Juan Pérez
     *              email: juan@example.com
     *              password: A1b2c3d4
     *              roles: "ADMIN_ROLE"
     *     responses:
     *       200:
     *         description: Usuario registrado correctamente
     *       400:
     *         description: Error de validación
     */
    router.post("/register", controller.registerUser);

    /**
     * @openapi
     * /api/auth/login:
     *   post:
     *     summary: Iniciar sesión
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login exitoso
     *       400:
     *         description: Credenciales inválidas
     */
    router.post("/login", controller.loginUser);

    return router;
  }
}
