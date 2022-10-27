import { Request, Response } from "express";

import { AuthService } from "../../services/auth/AuthService";

class AuthUserController {
    async handle(req: Request, res: Response) {

        const service = new AuthService();
        const auth = await service.execute({
            name: "foo",
            email: req.body.email,
            password: req.body.password,
        });

        return res.json(auth);
    }
}

export { AuthUserController } 