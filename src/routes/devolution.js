import { Router } from 'express';
import devolutionController from '../controllers/DevolutionController';

// import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', devolutionController.store);
router.get('/', devolutionController.index);

export default router;
