import { Router } from 'express';
import workerController from '../controllers/WorkerController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', workerController.index);
router.post('/', loginRequired, workerController.store);
router.get('/:id', workerController.show);
router.delete('/:id', loginRequired, workerController.delete);
router.put('/:id', loginRequired, workerController.update);

export default router;
