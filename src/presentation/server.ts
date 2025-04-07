import express, { Router } from 'express';
import { ErrorHandler } from './middlewares/errorHandler.middleware';
import { setupSwagger } from '../config/swagger'; // importá tu archivo de swagger

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Swagger docs
    setupSwagger(this.app);

    // API Routes
    this.app.use(this.routes);

    // Error handler
    this.app.use(ErrorHandler.errorHandler);

    this.app.listen(this.port, '0.0.0.0', () => {
      console.log(`Server running at port ${this.port}`);
      console.log(`Swagger docs available at http://localhost:${this.port}/api-docs`);
    });
  }
}
