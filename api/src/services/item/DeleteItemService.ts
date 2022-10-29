import prismaClient from "../../prisma";
import { FindItemByIdService } from "./FindItemByIdService";
import { ItemModel } from "./interfaces/ItemModel";

class DeleteItemService {
    async execute(id: string): Promise<ItemModel> {
        const findItemById = new FindItemByIdService();
        try {


            const itemFound = await findItemById.execute(id);

            if (!itemFound) {
                throw new Error(`[DeleteItemService] - Item was not found`);
            }

            const item = await prismaClient.item.delete({
                where: {
                    id: itemFound.id,
                }
            })

            return item;

        } catch (error) {
            throw new Error(`[DeleteItemService] - ${error.message}`)
        }
    }
}

export { DeleteItemService }