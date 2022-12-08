import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { cpf = '', password = '' } = req.body;

    if (!cpf || !password) {
      return res.status(401).json({
        errors: ['Invalid credentials'],
      });
    }

    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      return res.status(401).json({
        errors: ['No such user'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Invalid password'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, cpf }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({
      token,
      user: {
        name: user.name, id, cpf, isManager: user.isManager,
      },
    });
  }
}

export default new TokenController();
