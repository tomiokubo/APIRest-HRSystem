import Sequelize, { Model } from 'sequelize';

export default class Picture extends Model {
  static init(sequelize) {
    super.init({
      original_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Original name cannot be empty',
          },
        },
      },
      file_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'File name cannot be empty',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Worker, { foreignKey: 'worker_id' });
  }
}
