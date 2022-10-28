import { Request, Response } from "express";
import { FindProductByCategoryIdService } from "../../services/product/FindProductByCategoryIdService";


class FindProductByCategoryIdController {
    async handle(req: Request, res: Response) {

        const service = new FindProductByCategoryIdService();

        const data = await service.execute(req.params.id as string);

        return res.json({ data });
    }
}

export { FindProductByCategoryIdController }