import prismaClient from "../../prisma";
import { ItemModel } from "./interfaces/ItemModel";

class FindItemByIdService {
    async execute(id: string): Promise<ItemModel> {

        try {

            if (!id) {
                throw new Error(`[FindItemByIdService] - id was not informed`)
            }

            const item = await prismaClient.item.findFirst({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    order_id: true,
                    product_id: true,
                    amount: true,
                }
            })

            return item;

        } catch (error) {
            throw new Error(`[FindItemByIdService] - ${error.message}`)
        }
    }
}

export { FindItemByIdService }