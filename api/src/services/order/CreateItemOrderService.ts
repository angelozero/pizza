import prismaClient from "../../prisma";
import { ItemOrderModel } from "./interfaces/ItemOrderModel";
import { ValidateItemOrderService } from "./ValidateItemOrderService";

class CreateItemOrderService {
    async execute(item: ItemOrderModel) {
        const validateItemOrderService = new ValidateItemOrderService();

        try {
            await validateItemOrderService.execute(item);

            const itemOrder = await prismaClient.item.create({
                data: {
                    order_id: item.orderId,
                    product_id: item.productId,
                    amount: item.amount
                },
                select: {
                    id: true,
                    order_id: true,
                    product_id: true,
                    amount: true,
                }
            })


            return itemOrder;

        } catch (error) {
            throw new Error(`[AddItemOrderService] - ${error}`)
        }

    }
}

export { CreateItemOrderService }