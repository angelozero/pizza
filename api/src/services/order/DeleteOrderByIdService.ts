import prismaClient from "../../prisma";
import { FindOrderByIdService } from "./FindOrderByIdService";


class DeleteOrderByIdService {
    async execute(orderId: string) {
        const service = new FindOrderByIdService();

        try {
            const orderData = await service.execute(orderId);

            if (!orderData) {
                throw new Error('Order was not found')
            }

            await prismaClient.order.delete({
                where: {
                    id: orderData.id,
                }
            })
        }

        catch (error: any) {
            throw new Error(`[DeleteOrderByIdService] - ${error.message}`);
        }
    }
}

export { DeleteOrderByIdService }