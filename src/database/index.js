import Sequelize from 'sequelize';
import databeConfig from '../config/database';
import Worker from '../models/Worker';

const models = [Worker];

const connection = new Sequelize(databeConfig);

models.forEach((model) => model.init(connection));
