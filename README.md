# The API

## Database
- First of all lets create the data base model to our application
- For database we gonna use the [PostgreSQL](https://www.postgresql.org/docs/)
- ORM we gonna use [Prisma - Next-generation Node.js and TypeScript ORM](https://www.prisma.io/)
- ![database](https://i.postimg.cc/WzHhZMzz/Whats-App-Image-2022-10-26-at-8-28-53-PM.jpg)
```javascript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id         String    @id @default(uuid())
  name       String
  email      String
  password   String
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())

  @@map("users")
}

model Category {
  id         String    @id @default(uuid())
  name       String
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())

  products Product[]

  @@map("categories")
}

model Product {
  id          String    @id @default(uuid())
  name        String
  price       String
  description String
  banner      String
  created_at  DateTime? @default(now())
  updated_at  DateTime? @default(now())

  category    Category @relation(fields: [category_id], references: [id])
  category_id String

  items Item[]

  @@map("products")
}

model Order {
  id         String    @id @default(uuid())
  table      Int
  status     Boolean   @default(false)
  draft      Boolean   @default(true)
  name       String?
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())

  items Item[]

  @@map("orders")
}

model Item {
  id         String    @id @default(uuid())
  amount     Int
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())

  order   Order   @relation(fields: [order_id], references: [id])
  product Product @relation(fields: [product_id], references: [id])

  order_id   String
  product_id String

  @@map("items")
}
```

- And to use `Prisma` here is the configuration
```javascript
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export default prismaClient;
```

---
## Client Auth / JWT 
- For auth
- ![jwt](https://i.postimg.cc/3wYJdL19/Whats-App-Image-2022-10-26-at-11-18-17-PM.jpg)
```javascript
class SingService {
    async excute(user: UserModel) {

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET, 
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return token;
    }
}
```
- For password validation
```javascript
import { compare } from "bcryptjs";


class ValidatePasswordService {
    async execute(userPassword: string, userHashPassword: string) {

        const passwordMatch = await compare(userPassword, userHashPassword);

        if (!passwordMatch) {
            throw new Error('[ValidatePasswordService] - Invalid password');
        }
    }
}

export { ValidatePasswordService }
```
---

## Using Middleware
- Checking if the user is authenticated
- `isAuthenticated.js`
```javascript
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { PayloadModel } from "./interfaces/PayloadModel";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {

        const { sub } = verify(
            token,
            process.env.JWT_SECRET,
        ) as PayloadModel;

        req.user_id = sub;

        return next();

    } catch (error) {
        return res.status(401).end();
    }
}
```
- Using the authentication in `Routes.js`
```javascript
import { Router } from 'express';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// Login Detail
router.get('/me', isAuthenticated, new DetailUserController().handle)
```

---

## The MVC, how it works ? 
- For the rest of services you can check in `Routes.js`
-
```javascript
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
```

## Nexts steps
- Separate the connection layer  with the database and the services class