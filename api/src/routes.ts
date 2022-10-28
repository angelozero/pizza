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
import { DeleteOrderController } from './controllers/order/DeleteOrderController';
import { CreateItemController } from './controllers/item/CreateItemController';
import { RemoveItemController } from './controllers/item/RemoveItemController';


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
router.get('/product', isAuthenticated, new FindProductByIdController().handle)
router.get('/product/category', isAuthenticated, new FindProductByCategoryIdController().handle)

// Order
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.get('/order', isAuthenticated, new FindOrderByIdController().handle)
router.delete('/order', isAuthenticated, new DeleteOrderController().handle)

// Item
router.post('/item', isAuthenticated, new CreateItemController().handle)
router.delete('/item', isAuthenticated, new RemoveItemController().handle)


export { router };