import Sequelize from 'sequelize';
import databeConfig from '../config/database';

import User from '../models/User';
import Sale from '../models/Sale';
import Cancel from '../models/Cancel';
import Devolution from '../models/Devolution';

const models = [User, Sale, Cancel, Devolution];

const connection = new Sequelize(databeConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
