import { Router } from 'express';

import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';

const router = Router();

// User
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

export { router };