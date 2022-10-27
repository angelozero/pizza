import { Request, Response } from "express";

import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
    async handle(req: Request, res: Response) {
        const service = new DetailUserService();

        return res.json(await service.execute(req.user_id));
    }
}

export { DetailUserController }