import prismaClient from "../../prisma";
import { OrderModel } from "./interfaces/OrderModel";
import { ValidateOrderService } from "./ValidateOrderService";


class CreateOrderService {
    async execute(order: OrderModel) {
        const validateOrderService = new ValidateOrderService();

        try {
            await validateOrderService.execute(order);

            const orderCreated = await prismaClient.order.create({
                data: {
                    table: order.table,
                    status: order.status,
                    draft: order.draft,
                    name: order.name,
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
            throw new Error(`[CreateOrderService] - ${error.message}`);
        }
    }
}

export { CreateOrderService }