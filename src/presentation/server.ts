import express, { Router } from 'express';
import { ErrorHandler } from './middlewares/errorHandler.middleware';


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
    //middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //usar las rutas definidas
    this.app.use(this.routes);

    this.app.use(ErrorHandler.errorHandler)

    this.app.listen(this.port, () => {
      console.log(`Server running at port ${this.port}`);
    });
  }
}
