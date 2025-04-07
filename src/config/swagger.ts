import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth & User API",
      version: "1.0.0",
      description: `
RESTful API construida con **TypeScript** siguiendo los principios de **Clean Architecture**.

La API se compone de dos módulos principales:

- **Auth**: Maneja la autenticación y autorización mediante **JWT**. Permite a los usuarios registrarse e iniciar sesión de forma segura.
- **User**: Permite la gestión de usuarios (consultar, actualizar y eliminar) y está protegida por autenticación JWT.

Esta API expone endpoints bien estructurados bajo los principios de REST, facilitando su integración y mantenimiento. Ideal para ser utilizada como backend de aplicaciones web o móviles.

### Autenticación
Para acceder a las rutas protegidas, incluí el token JWT en el encabezado de la siguiente forma:

\`\`\`
Authorization: Bearer <token>
\`\`\`

`,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/presentation/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
