import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "./controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";

export class userRoutes {
  static get routes(): Router {
    const router = Router();

    const dataSourse = new UserDatasourceImpl();

    const userRepository = new UserRepositoryImpl(dataSourse);

    const controller = new UserController(userRepository);

    /**
     * @openapi
     * /api/user:
     *   get:
     *     summary: Obtener todos los usuarios
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de usuarios
     *       401:
     *         description: No autorizado
     */
    router.get("/", AuthMiddleware.validateRole, controller.getUsers);
    /**
     * @openapi
     * /api/user/{id}:
     *   get:
     *     summary: Obtener usuario por ID
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Usuario encontrado
     *       401:
     *         description: No autorizado
     *       404:
     *         description: Usuario no encontrado
     */
    router.get("/:id", AuthMiddleware.validateRole, controller.getUserById);
    /**
     * @openapi
     * /api/user/{id}:
     *   delete:
     *     summary: Eliminar usuario por ID
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Usuario eliminado
     *       401:
     *         description: No autorizado
     *       404:
     *         description: Usuario no encontrado
     */
    router.delete("/:id", AuthMiddleware.validateRole, controller.deleteUserById);
    /**
     * @openapi
     * /api/user/{id}:
     *   put:
     *     summary: Actualizar usuario por ID
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               roles:
     *                 type: array
     *                 items:
     *                   type: string
     *     responses:
     *       200:
     *         description: Usuario actualizado
     *       400:
     *         description: Error de validación
     *       401:
     *         description: No autorizado
     *       404:
     *         description: Usuario no encontrado
     */
    router.put("/:id", AuthMiddleware.validateRole, controller.updateUser);

    return router;
  }
}
