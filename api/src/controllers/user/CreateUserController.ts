import { Request, Response } from "express";

import { CreateUserService } from "../../services/user/CreateUserService";
import { UserRequest } from "./interfaces/UserRequest";

class CreateUserController {
    async handle(req: Request, res: Response) {
        
        const service = new CreateUserService();

        const response = await service.execute(req.body as UserRequest)

        return res.json({ ok: response });
    }
}

export { CreateUserController }