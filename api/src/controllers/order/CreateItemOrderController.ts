import { Request, Response } from "express";
import { CreateItemOrderService } from "../../services/order/CreateItemOrderService";
import { ItemOrderRequest } from "./interfaces/ItemOrderRequest";


class CreateItemOrderController {
    async handle(req: Request, res: Response) {

        const service = new CreateItemOrderService();

        const data = await service.execute(req.body as ItemOrderRequest);

        return res.json({ data });
    }
}

export { CreateItemOrderController }