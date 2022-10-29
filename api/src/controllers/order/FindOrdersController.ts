import { Request, Response } from "express";

import { FindOrdersService } from "../../services/order/FindOrdersService";
import { OrderResponse } from "./interfaces/OrderResponse";


class FindOrdersController {
    async handle(req: Request, res: Response) {

        const service = new FindOrdersService();

        const data = await service.execute(req.query.available as string) as OrderResponse[];

        return res.json({ data });
    }
}

export { FindOrdersController }