import { Router } from 'express';
import OrderController from '../controllers/ordersControler';
import validateJwt from '../auth/validateJwt';
import validateJoi from '../middlewares/validateJoi';
import { validateProductIds } from '../schemas/joiSchemas';

const router = Router();

const orderController = new OrderController();

router.get('/', orderController.getAll);
router.post('/', validateJwt, validateJoi(validateProductIds), orderController.create);

export default router;