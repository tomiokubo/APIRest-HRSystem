import Sequelize, { Model } from 'sequelize';

export default class Sale extends Model {
  static init(sequelize) {
    super.init({
      client: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      order: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      value: {
        type: Sequelize.FLOAT,
        defaultValue: '',
      },
      seller: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: '',
      },
      architect: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        references: {
          model: 'users',
          key: 'id',
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'architect' });
    this.hasMany(models.Cancel, { foreignKey: 'sale' });
    this.hasMany(models.Devolution, { foreignKey: 'sale' });
  }
}
