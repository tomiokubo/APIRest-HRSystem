import Worker from '../models/Worker';
import Picture from '../models/Picture';

class WorkerController {
  async index(req, res) {
    const workers = await Worker.findAll({
      attributes: ['id', 'first_name', 'last_name', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [Picture, 'id', 'DESC']],
      include: {
        model: Picture,
        attributes: ['url', 'file_name'],
      },
    });
    res.json(workers);
  }

  async store(req, res) {
    try {
      const worker = await Worker.create(req.body);
      return res.json(worker);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }
      const worker = await Worker.findByPk(id, {
        attributes: ['id', 'first_name', 'last_name', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC']],
        include: {
          model: Picture,
          attributes: ['url', 'file_name'],
        },
      });

      if (!worker) {
        return res.status(400).json({
          errors: ['No such user'],
        });
      }
      return res.json(worker);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }
      const worker = await Worker.findByPk(id);

      if (!worker) {
        return res.status(400).json({
          errors: ['No such user'],
        });
      }

      await worker.destroy();
      return res.json({ deleted: true });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }
      const worker = await Worker.findByPk(id);

      if (!worker) {
        return res.status(400).json({
          errors: ['No such user'],
        });
      }

      const updatedWorker = await worker.update(req.body);
      return res.json(updatedWorker);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new WorkerController();
