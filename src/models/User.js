import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      cpf: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Invalid email',
          },
        },
      },
      birthDate: {
        type: Sequelize.DATE,
        defaultValue: '',
      },
      telephoneNumber: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      cep: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      address: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      addressNumber: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      additionalInformation: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      neighborhood: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      city: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      passwordHash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Password must be between 6 and 50 characters',
          },
        },
      },
      isManager: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.passwordHash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.passwordHash);
  }
}
