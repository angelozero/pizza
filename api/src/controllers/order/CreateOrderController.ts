import { Request, Response } from "express";

import { CreateOrderService } from "../../services/order/CreateOrderService";
import { OrderRequest } from "./interfaces/OrderRequest";
import { OrderResponse } from "./interfaces/OrderResponse";

class CreateOrderController {
    async handle(req: Request, res: Response) {

        const service = new CreateOrderService();

        const data = await service.execute(req.body as OrderRequest) as OrderResponse;

        return res.json({ data });
    }
}

export { CreateOrderController }