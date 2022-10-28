import { Request, Response } from "express";

import { DetailUserService } from "../../services/user/DetailUserService";
import { UserResponse } from "./interfaces/UserResponse";

class DetailUserController {
    async handle(req: Request, res: Response) {
        const service = new DetailUserService();

        const data = await service.execute(req.headers.id as string) as UserResponse

        return res.json({ data });
    }
}

export { DetailUserController }