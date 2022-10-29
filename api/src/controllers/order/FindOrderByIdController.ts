import { Request, Response } from "express";

import { FindOrderByIdService } from "../../services/order/FindOrderByIdService";
import { OrderResponse } from "./interfaces/OrderResponse";


class FindOrderByIdController {
    async handle(req: Request, res: Response) {

        const service = new FindOrderByIdService();

        const data = await service.execute(req.query.id as string) as OrderResponse;

        return res.json({ data });
    }
}

export { FindOrderByIdController }