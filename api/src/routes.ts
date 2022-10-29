import multer from 'multer';
import uploadConfig from './config/multer'

import { Router } from 'express';

import { DetailUserController } from './controllers/user/DetailUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { FindProductByIdController } from './controllers/product/FindProductByIdController';
import { FindProductByCategoryIdController } from './controllers/product/FindProductByCategoryIdController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { FindOrderByIdController } from './controllers/order/FindOrderByIdController';
import { DeleteOrderController } from './controllers/order/DeleteOrderController';
import { CreateItemController } from './controllers/item/CreateItemController';
import { RemoveItemController } from './controllers/item/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { FindOrdersController } from './controllers/order/FindOrdersController';
import { DetailOrderByIdController } from './controllers/order/DetailOrderByIdController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

// User
router.get('/me', isAuthenticated, new DetailUserController().handle)
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

// Category
router.get('/category', isAuthenticated, new ListCategoryController().handle)
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

// Product
router.get('/product/category', isAuthenticated, new FindProductByCategoryIdController().handle)
router.get('/product', isAuthenticated, new FindProductByIdController().handle)
router.post('/product', isAuthenticated, upload.single('banner'), new CreateProductController().handle)

// Order
router.get('/order', isAuthenticated, new FindOrderByIdController().handle)
router.get('/orders', isAuthenticated, new FindOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderByIdController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderByIdController().handle)
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.put('/order', isAuthenticated, new SendOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)
router.delete('/order', isAuthenticated, new DeleteOrderController().handle)

// Item
router.post('/item', isAuthenticated, new CreateItemController().handle)
router.delete('/item', isAuthenticated, new RemoveItemController().handle)


export { router };