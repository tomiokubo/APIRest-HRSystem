import Sequelize from 'sequelize';
import databeConfig from '../config/database';
import Worker from '../models/Worker';
import User from '../models/User';
import Picture from '../models/Picture';

const models = [Worker, User, Picture];

const connection = new Sequelize(databeConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
