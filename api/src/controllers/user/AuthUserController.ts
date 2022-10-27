import { Request, Response } from "express";

import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
    async handle(req: Request, res: Response) {

        const service = new AuthUserService();
        const auth = await service.execute({
            name: "foo",
            email: req.body.email,
            password: req.body.password,
        });

        return res.json(auth);
    }
}

export { AuthUserController } 