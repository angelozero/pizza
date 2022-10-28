import { Request, Response } from "express";

import { CreateOrderService } from "../../services/order/CreateOrderService";
import { OrderRequest } from "./interfaces/OrderRequest";

class CreateOrderController {
    async handle(req: Request, res: Response) {

        const service = new CreateOrderService();

        const data = await service.execute(req.body as OrderRequest);

        return res.json({ data });
    }
}

export { CreateOrderController }