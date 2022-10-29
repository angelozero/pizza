import { Request, Response } from "express";

import { DeleteItemService } from "../../services/item/DeleteItemService";
import { ItemResponse } from "./interfaces/ItemResponse";

class RemoveItemController {
    async handle(req: Request, res: Response) {

        const service = new DeleteItemService();

        const data = await service.execute(req.query.id as string) as ItemResponse;

        return res.json({ data });
    }
}

export { RemoveItemController }

