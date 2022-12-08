import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;
      return res.json({ id, name, email });
    } catch (e) {
      // return res.status(400).json({
      //   errors: e.errors.map((error) => error.message),
      // });
      return console.log(e);
    }
  }

  async index(req, res) {
    try {
      const { cpf } = req.params;
      const user = await User.findOne({
        where: { cpf },
        attributes: ['id', 'name'],
      });
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['passwordHash'] },
      });
      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.body.id);
      if (!user) {
        return res.status(400).json({
          errors: ['No such user'],
        });
      }

      const updatedUser = await user.update(req.body);
      const { id } = updatedUser;

      return res.json({ id });
    } catch (e) {
      return res.status(400).json({
        e,
      });
      // return console.log(e);
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['No such user'],
        });
      }

      await user.destroy(req.body);
      const { id, name, email } = user;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new UserController();
