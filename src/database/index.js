import Sequelize from 'sequelize';
import databeConfig from '../config/database';
import Worker from '../models/Worker';
import User from '../models/User';

const models = [Worker, User];

const connection = new Sequelize(databeConfig);

models.forEach((model) => model.init(connection));
