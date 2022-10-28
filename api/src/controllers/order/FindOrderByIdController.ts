import { Request, Response } from "express";

import { FindOrderByIdService } from "../../services/order/FindOrderByIdService";


class FindOrderByIdController {
    async handle(req: Request, res: Response) {

        const service = new FindOrderByIdService();

        const data = await service.execute(req.params.id as string);

        return res.json({ data });
    }
}

export { FindOrderByIdController }