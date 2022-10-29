import { Request, Response } from "express";
import { DeleteOrderByIdService } from "../../services/order/DeleteOrderByIdService";

class DeleteOrderController {
    async handle(req: Request, res: Response) {

        const service = new DeleteOrderByIdService();

        await service.execute(req.query.id as string);

        return res.json({ response: "Order deleted with success" }).status(206);
    }
}

export { DeleteOrderController }