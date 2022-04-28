import Worker from '../models/Worker';

class WorkerController {
  async index(req, res) {
    const workers = await Worker.findAll();
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
      const worker = await Worker.findByPk(id);

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
