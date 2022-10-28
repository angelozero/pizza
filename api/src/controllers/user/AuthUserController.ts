import { Request, Response } from "express";

import { AuthService } from "../../services/login/auth/AuthService";
import { UserResponse } from "./interfaces/UserResponse";

class AuthUserController {
    async handle(req: Request, res: Response) {

        const service = new AuthService();
        const auth = await service.execute({
            name: "foo",
            email: req.body.email,
            password: req.body.password,
        }) as UserResponse;

        return res.json(auth);
    }
}

export { AuthUserController } 