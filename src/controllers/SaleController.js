import Sale from '../models/Sale';
import User from '../models/User';
import Cancel from '../models/Cancel';
import Devolution from '../models/Devolution';

class SaleController {
  async store(req, res) {
    try {
      const newSale = await Sale.create(req.body);
      const { id } = newSale;
      return res.json({ id });
    } catch (e) {
      return res.status(400).json({
        error: e,
      });
    }
  }

  async index(req, res) {
    try {
      const sales = await Sale.findAll(
        {
          include: [
            {
              model: User,
              attributes: ['cpf', 'name'],
            },
            { model: Cancel },
            { model: Devolution },
          ],
          order: [['date', 'DESC']],
        },
      );
      return res.json(sales);
    } catch (error) {
      console.log(error);
      return res.json(null);
    }
  }

  async findByArchitectId(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Architect Id not sent'],
        });
      }
      const sales = await Sale.findAll({
        where: { architect: id },
        include: [
          { model: Cancel },
          { model: Devolution },
        ],
        order: [['date', 'DESC']],
      });
      return res.json(sales);
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  async findByOrder(req, res) {
    try {
      const { order } = req.params;
      if (!order) {
        return res.status(400).json({
          errors: ['No such order'],
        });
      }
      const sales = await Sale.findOne({
        where: { order },
        include: {
          model: User,
          attributes: ['cpf', 'name'],
        },
      });
      return res.json(sales);
    } catch (error) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const sale = await Sale.findByPk(req.params.id);
      return res.json(sale);
    } catch (error) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      const sale = await Sale.findByPk(req.userId);

      if (!sale) {
        return res.status(400).json({
          errors: ['No such user'],
        });
      }

      await sale.destroy(req.body);
      const { id } = sale;
      return res.json({ id });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new SaleController();
