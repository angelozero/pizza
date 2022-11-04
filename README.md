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

# The Client-Side
- _Obs.: Information if you are getting this error `cb.apply is not a function`_
- try this [solution](https://stackoverflow.com/questions/67315860/npm-err-cb-apply-is-not-a-function-elementary-os)
    - run the command in the terminal on root folder type
```
    npm install --global npm
```
---
## CSS and SASS
- For the CSS we are using the [SASS](https://github.com/sass/dart-sass)
---
## Auth Context
- Storing the user token ( see the `canSSRAuth` and `canSSRGuest` files. )
```javascript
export function setupAPIClient(context = undefined) {
    let cookies = parseCookies(context);

    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response.status === 401) {
            if (typeof window !== undefined) {
                singOut();
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }
        return Promise.reject(error);
    })

    return api;
}
```
---

## React-Toastify 
- Using [React-Toastify](https://www.npmjs.com/package/react-toastify) to show some nice alerts!
![alerts](https://user-images.githubusercontent.com/5574267/130804494-a9d2d69c-f170-4576-b2e1-0bb7f13dd92d.gif)

---

## Server Side - SingIn SingOut
- Checkt the `AuthContext.tsx`file to see how we use the SingIn SingOut
```javascript
export function singOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch (error) {
        console.log('[BigShell Pizza - ERROR] - Sing out has an error ', error)
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    // !!use -> return true if user has data, else false.
    const isAuthenticated = !!user;


    // cheking if is the user and getting his info
    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            console.log("API ", api)
            api.get('/me').then(response => {
                const { id, name, email } = response.data;
                setUser({ id, name, email })

            }).catch(() => {
                singOut();
            })
        }
    }, [])

    async function singIn({ email, password }: SingInProps) {

        try {
            const response = await api.post('/session', {
                email,
                password
            })


            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            });

            setUser({
                id,
                name,
                email
            })

            // sharing the token for the requests
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success("Welcome !");

            // Redirect the user for the dashboar page
            Router.push('/dashboard');

        } catch (error) {
            toast.error("Something went wrong :(");
            console.log("[ERROR] - Sing In Error ", error);
        }
    }

    async function singUp({ name, email, password }: SingUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })
            toast.success("Registration done with success!");
            Router.push('/');

        } catch (error) {
            toast.error("Something went wrong :(");
            console.log("[ERROR] - Sing Up Error ", error);
        }
    }

    return (
        <AuthContext.Provider value={({ user, isAuthenticated, singIn, singOut, singUp })}>
            {children}
        </AuthContext.Provider>
    )
}
```