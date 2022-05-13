import { Router } from 'express';
import ProductControllers from '../controllers/productController';

const router = Router();

const productController = new ProductControllers();

router.get('/', productController.getAll);

export default router;