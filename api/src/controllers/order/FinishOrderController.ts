import { Request, Response } from "express";

import { FinishOrderService } from "../../services/order/FinishOrderService";
import { OrderResponse } from "./interfaces/OrderResponse";

class FinishOrderController {
    async handle(req: Request, res: Response) {

        const service = new FinishOrderService();

        const data = await service.execute(req.body.id as string) as OrderResponse;

        return res.json({ data });
    }
}

export { FinishOrderController }