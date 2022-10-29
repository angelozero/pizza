import prismaClient from "../../prisma";
import { ItemModel } from "./interfaces/ItemModel";
import { ValidateItemService } from "./ValidateItemService";

class CreateItemService {
    async execute(item: ItemModel): Promise<ItemModel> {
        const validateItemOrderService = new ValidateItemService();

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

            return {
                id: itemOrder.id,
                orderId: itemOrder.order_id,
                productId: itemOrder.product_id,
                amount: itemOrder.amount,
            };

        } catch (error) {
            throw new Error(`[CreateItemService] - ${error}`)
        }
    }
}

export { CreateItemService }