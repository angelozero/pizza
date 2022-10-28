import { Request, Response } from "express";

import { CreateUserService } from "../../services/user/CreateUserService";
import { UserRequest } from "./interfaces/UserRequest";
import { UserResponse } from "./interfaces/UserResponse";

class CreateUserController {
    async handle(req: Request, res: Response) {

        const service = new CreateUserService();

        const data = await service.execute(req.body as UserRequest) as UserResponse;

        return res.json({ data });
    }
}

export { CreateUserController }