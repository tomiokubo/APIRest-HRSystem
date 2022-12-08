import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', userController.store);
router.get('/:cpf', userController.index);
router.get('/show/:id', userController.show);
router.put('/', userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
