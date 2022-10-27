import { Router } from 'express';
import { DetailUserController } from './controllers/user/DetailUserController';

import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// User
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

// Login Detail
router.get('/me', isAuthenticated, new DetailUserController().handle)

export { router };