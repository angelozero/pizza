import { Request, Response } from "express";
import { FindProductByIdService } from "../../services/product/FindProductByIdService";
import { ProductResponse } from "./interface/ProductResponse";

class FindProductByIdController {
    async handle(req: Request, res: Response) {

        const service = new FindProductByIdService();

        const data = await service.execute(req.params.id as string) as ProductResponse;

        return res.json({ data });
    }
}

export { FindProductByIdController }