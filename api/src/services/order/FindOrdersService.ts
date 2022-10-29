import prismaClient from "../../prisma";
import { OrderModel } from "./interfaces/OrderModel";

class FindOrdersService {
    async execute(available: string): Promise<OrderModel[]> {

        try {

            if (!available) {
                const order = await prismaClient.order.findMany({
                    orderBy: {
                        created_at: 'desc'
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

            } else {
                const isAvailable = available === 'true';

                const order = await prismaClient.order.findMany({
                    where: {
                        draft: !isAvailable,
                    },
                    orderBy: {
                        created_at: 'desc'
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
        }

        catch (error) {
            throw new Error(`[FindOrdersService] - ${error}`);
        }
    }
}

export { FindOrdersService }