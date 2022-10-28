import { Request, Response } from "express";
import { CloseOrderByIdService } from "../../services/order/CloseOrderByIdService";

import { CreateOrderService } from "../../services/order/CreateOrderService";
import { OrderRequest } from "./interfaces/OrderRequest";

class CloseOrderController {
    async handle(req: Request, res: Response) {

        const service = new CloseOrderByIdService();

        await service.execute(req.params.id as string);

        return res.json({ response: "Order canceled with success" }).status(206);
    }
}

export { CloseOrderController }