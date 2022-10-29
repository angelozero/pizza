import { Request, Response } from "express";

import { SendOrderService } from "../../services/order/SendOrderService";
import { OrderResponse } from "./interfaces/OrderResponse";

class SendOrderController {
    async handle(req: Request, res: Response) {

        const service = new SendOrderService();

        const data = await service.execute(req.body.id as string) as OrderResponse;

        return res.json({ data });
    }
}

export { SendOrderController }