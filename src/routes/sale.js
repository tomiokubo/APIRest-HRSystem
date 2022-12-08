import { Router } from 'express';
import saleController from '../controllers/SaleController';

// import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', saleController.store);
router.get('/', saleController.index);
router.get('/:order', saleController.findByOrder);
router.get('/archId/:id', saleController.findByArchitectId);

export default router;
