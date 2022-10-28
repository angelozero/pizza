import { Request, Response } from "express";

import { DetailUserService } from "../../services/user/DetailUserService";
import { UserResponse } from "./interfaces/UserResponse";

class DetailUserController {
    async handle(req: Request, res: Response) {
        const service = new DetailUserService();

        const data = await service.execute(req.user_id) as UserResponse

        return res.json({ data });
    }
}

export { DetailUserController }