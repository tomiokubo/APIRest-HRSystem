import Devolution from '../models/Devolution';

class DevolutionController {
  async store(req, res) {
    try {
      const newDevolution = await Devolution.create(req.body);
      const { id } = newDevolution;
      return res.json({ id });
    } catch (e) {
      // return res.status(400).json({
      //   error: e,
      // });
      return console.log(e);
    }
  }

  async index(req, res) {
    try {
      const sales = await Devolution.findAll();
      return res.json(sales);
    } catch (error) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      const devolution = await Devolution.findByPk(req.userId);

      if (!devolution) {
        return res.status(400).json({
          errors: ['No such user'],
        });
      }

      await devolution.destroy(req.body);
      const { id } = devolution;
      return res.json({ id });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new DevolutionController();
