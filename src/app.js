import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import helmet from 'helmet';

import userRoutes from './routes/user';
import tokenRoutes from './routes/token';
import saleRoutes from './routes/sale';
import cancelRoutes from './routes/cancel';
import devolutionRoutes from './routes/devolution';
import './database';

dotenv.config();

const whiteList = [

  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/sales/', saleRoutes);
    this.app.use('/cancels/', cancelRoutes);
    this.app.use('/devolutions/', devolutionRoutes);
  }
}

export default new App().app;
