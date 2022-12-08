import { Router } from 'express';
import cancelController from '../controllers/CancelController';

// import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', cancelController.store);
router.get('/', cancelController.index);

export default router;
