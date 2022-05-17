import { Router } from 'express';
import UserControllers from '../controllers/userControler';
import validateJoi from '../middlewares/validateJoi';
import { validateLogin } from '../schemas/joiSchemas';

const router = Router();

const userControllers = new UserControllers();

router.post('/', validateJoi(validateLogin), userControllers.getUser);

export default router;