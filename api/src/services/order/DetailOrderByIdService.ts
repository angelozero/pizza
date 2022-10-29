import prismaClient from "../../prisma";
import { ItemModel } from "../item/interfaces/ItemModel";
import { OrderModel } from "./interfaces/OrderModel";

class DetailOrderByIdService {
    async execute(orderId: string) {

        try {

            if (!orderId) {
                throw new Error('[DetailOrderByIdService] - Order id was not provided')
            }

            const order = await prismaClient.item.findMany({
                where: {
                    order_id: orderId,
                },
                include: {
                    product: true,
                    order: true,
                }
            })

            return order;
        }

        catch (error) {
            throw new Error(error);
        }
    }
}

export { DetailOrderByIdService }