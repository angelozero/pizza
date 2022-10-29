import { Request, Response } from "express";
import { CreateItemService } from "../../services/item/CreateItemService";
import { ItemRequest } from "./interfaces/ItemRequest";
import { ItemResponse } from "./interfaces/ItemResponse";


class CreateItemController {
    async handle(req: Request, res: Response) {

        const service = new CreateItemService();

        const data = await service.execute(req.body as ItemRequest) as ItemResponse;

        return res.json({ data });
    }
}

export { CreateItemController }