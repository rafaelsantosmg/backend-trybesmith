import { Router } from 'express';
import ProductControllers from '../controllers/productController';
import validateJoi from '../middlewares/validateJoi';
import { validateProduct } from '../schemas/joiSchemas';

const router = Router();

const productController = new ProductControllers();

router.get('/', productController.getAll);
router.post('/', validateJoi(validateProduct), productController.create);

export default router;