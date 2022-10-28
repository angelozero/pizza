import multer from 'multer';

import { Router } from 'express';
import { DetailUserController } from './controllers/user/DetailUserController';

import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { FindProductByIdController } from './controllers/product/FindProductByIdController';

import uploadConfig from './config/multer'
import { FindProductByCategoryIdController } from './controllers/product/FindProductByCategoryIdController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { FindOrderByIdController } from './controllers/order/FindOrderByIdController';
import { CloseOrderController } from './controllers/order/CloseOrderController';
import { CreateItemOrderController } from './controllers/order/CreateItemOrderController';


const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

// User
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// Category
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// Product
router.post('/product', isAuthenticated, upload.single('banner'), new CreateProductController().handle)
router.get('/product/:id', isAuthenticated, new FindProductByIdController().handle)
router.get('/product/category/:id', isAuthenticated, new FindProductByCategoryIdController().handle)

// Order
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.get('/order/:id', isAuthenticated, new FindOrderByIdController().handle)
router.delete('/order/:id', isAuthenticated, new CloseOrderController().handle)
router.post('/order/item', isAuthenticated, new CreateItemOrderController().handle)


export { router };