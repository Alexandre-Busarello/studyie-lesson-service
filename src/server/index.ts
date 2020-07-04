import express, { Application } from 'express';
import cors from 'cors';

import authMiddleware from './middlewares/auth';
import mainRoutes from './routes';
import contentRoutes from '@app/domain/content/routes';
import userRoutes from '@app/domain/user/routes';
import lessonRoutes from '@app/domain/lesson/routes';

class WebServer {
  server: Application;

  constructor() {
    this.server = express();
  }

  registerRoutes() {
    this.server.use(mainRoutes);

    this.server.use(authMiddleware);

    this.server.use(contentRoutes);
    this.server.use(userRoutes);
    this.server.use(lessonRoutes);
  }

  setup() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));

    this.registerRoutes();

    return this;
  }

  listen() {
    const port = process.env.PORT || '5000';
    this.server.listen(port, () => console.info(`Server ready and listening on port ${port}`));

    return this;
  }
}

export default new WebServer();
