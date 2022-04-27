import { Router } from 'express';
import workerController from '../controllers/WorkerController';

const router = new Router();

router.get('/', workerController.index);

export default router;
