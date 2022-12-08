import Cancel from '../models/Cancel';

class CancelController {
  async store(req, res) {
    try {
      const newCancel = await Cancel.create(req.body);
      const { id } = newCancel;
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
      const sales = await Cancel.findAll();
      return res.json(sales);
    } catch (error) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      const cancel = await Cancel.findByPk(req.userId);

      if (!cancel) {
        return res.status(400).json({
          errors: ['No such user'],
        });
      }

      await cancel.destroy(req.body);
      const { id } = cancel;
      return res.json({ id });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new CancelController();
