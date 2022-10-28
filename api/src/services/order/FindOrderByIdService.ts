import prismaClient from "../../prisma";
import { OrderModel } from "./interfaces/OrderModel";

class FindOrderByIdService {
    async execute(orderId: string): Promise<OrderModel> {

        try {

            if (!orderId) {
                throw new Error('[FindOrderByIdService] - Order id was not provided')
            }

            const order = await prismaClient.order.findFirst({
                where: {
                    id: orderId,
                },
                select: {
                    id: true,
                    table: true,
                    status: true,
                    draft: true,
                    name: true,
                }
            })

            return order;
        }

        catch (error) {
            throw new Error(error);
        }
    }
}

export { FindOrderByIdService }