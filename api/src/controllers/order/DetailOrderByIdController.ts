import { Request, Response } from "express";
import { DetailOrderByIdService } from "../../services/order/DetailOrderByIdService";

class DetailOrderByIdController {
    async handle(req: Request, res: Response) {

        const service = new DetailOrderByIdService();

        const data = await service.execute(req.query.id as string);

        return res.json({ data });
    }
}

export { DetailOrderByIdController }