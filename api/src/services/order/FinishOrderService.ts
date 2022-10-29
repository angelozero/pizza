import prismaClient from "../../prisma";
import { FindOrderByIdService } from "./FindOrderByIdService";
import { OrderModel } from "./interfaces/OrderModel";



class FinishOrderService {
    async execute(orderId: string): Promise<OrderModel> {

        const findOrderByIdService = new FindOrderByIdService();
        try {

            if (!orderId) {
                throw new Error(`[FinishOrderService] - No order id was informed`)
            }

            const order = await findOrderByIdService.execute(orderId);
            if (!order) {
                throw new Error(`[FinishOrderService] - No order was found`)
            }

            const orderCreated = await prismaClient.order.update({
                where: {
                    id: order.id

                }, 
                data: {
                    status: true
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
            throw new Error(`[FinishOrderService] - ${error.message}`);
        }
    }
}

export { FinishOrderService }