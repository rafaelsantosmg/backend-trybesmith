import { Router } from 'express';
import UserControllers from '../controllers/userControler';
import validateJoi from '../middlewares/validateJoi';
import { validateUser } from '../schemas/joiSchemas';

const router = Router();

const userControllers = new UserControllers();

router.post('/', validateJoi(validateUser), userControllers.create);

export default router;