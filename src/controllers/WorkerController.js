import Worker from '../models/Worker';

class WorkerController {
  async index(req, res) {
    const workers = await Worker.findAll();
    res.json(workers);
  }
}

export default new WorkerController();
