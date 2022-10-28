import { Request, Response } from "express";
import { FindProductByIdService } from "../../services/product/FindProductByIdService";

class FindProductByIdController {
    async handle(req: Request, res: Response) {

        const service = new FindProductByIdService();

        const data = await service.execute(req.params.id as string);

        return res.json({ data });
    }
}

export { FindProductByIdController }