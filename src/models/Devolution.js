import Sequelize, { Model } from 'sequelize';

export default class Devolution extends Model {
  static init(sequelize) {
    super.init({
      value: {
        type: Sequelize.FLOAT,
        defaultValue: '',
      },
      sale: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        references: {
          model: 'sales',
          key: 'id',
        },
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: '',
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sale, { foreignKey: 'sale' });
  }
}
