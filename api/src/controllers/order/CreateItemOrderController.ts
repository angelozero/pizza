import { Request, Response } from "express";
import { CreateItemService } from "../../services/item/CreateItemService";
import { ItemOrderRequest } from "./interfaces/ItemOrderRequest";
import { ItemOrderResponse } from "./interfaces/ItemOrderResponse";


class CreateItemOrderController {
    async handle(req: Request, res: Response) {

        const service = new CreateItemService();

        const data = await service.execute(req.body as ItemOrderRequest) as ItemOrderResponse;

        return res.json({ data });
    }
}

export { CreateItemOrderController }