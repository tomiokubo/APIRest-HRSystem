import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import tokenRoutes from './routes/token';
import workerRoutes from './routes/worker';
import pictureRoutes from './routes/picture';
import './database';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/workers/', workerRoutes);
    this.app.use('/pictures/', pictureRoutes);
  }
}

export default new App().app;
