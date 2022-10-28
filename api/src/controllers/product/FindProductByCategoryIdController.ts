import { Request, Response } from "express";
import { FindProductByCategoryIdService } from "../../services/product/FindProductByCategoryIdService";
import { ProductResponse } from "./interface/ProductResponse";


class FindProductByCategoryIdController {
    async handle(req: Request, res: Response) {

        const service = new FindProductByCategoryIdService();

        const data = await service.execute(req.params.id as string) as ProductResponse[];

        return res.json({ data });
    }
}

export { FindProductByCategoryIdController }