import Worker from '../models/Worker';

class HomeController {
  async index(req, res) {
    const newWorker = await Worker.create({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@gmail.com',
      age: 40,
      weight: 80.5,
      height: 1.80,
    });
    res.json(newWorker);
  }
}

export default new HomeController();
