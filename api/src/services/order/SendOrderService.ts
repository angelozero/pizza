import prismaClient from "../../prisma";
import { FindOrderByIdService } from "./FindOrderByIdService";
import { OrderModel } from "./interfaces/OrderModel";
import { ValidateOrderService } from "./ValidateOrderService";


class SendOrderService {
    async execute(id: string): Promise<OrderModel> {

        const findOrderByIdService = new FindOrderByIdService();

        try {

            if (!id) {
                throw new Error(`[SendOrderService] - Id from order was not informed`)
            }

            const order = await findOrderByIdService.execute(id);
            if (!order) {
                throw new Error(`[SendOrderService] - Order was not found`)
            }

            const orderCreated = await prismaClient.order.update({
                where: {
                    id: order.id
                },
                data: {
                    draft: false,
                },
                select: {
                    id: true,
                    table: true,
                    status: true,
                    draft: true,
                    name: true,
                }
            })

            return orderCreated;
        }

        catch (error: any) {
            throw new Error(`[SendOrderService] - ${error.message}`);
        }
    }
}

export { SendOrderService }