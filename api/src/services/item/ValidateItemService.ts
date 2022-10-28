import { FindOrderByIdService } from "../order/FindOrderByIdService"
import { FindProductByIdService } from "../product/FindProductByIdService";
import { ItemModel } from "./interfaces/ItemModel"

class ValidateItemService {
    async execute(item: ItemModel) {

        const findOrderByIdService = new FindOrderByIdService();
        const findProductByIdService = new FindProductByIdService();
        try {

            if (!item) {
                throw new Error('Item was not informed')
            }
            if (!item.orderId) {
                throw new Error('An order id from Item was not informed')
            }
            if (!item.productId) {
                throw new Error('A product id from Item was not informed')
            }
            if (!item.amount) {
                throw new Error('An amount from Item was not informed')
            }

            const isValidOrderId = await findOrderByIdService.execute(item.orderId);
            if (!isValidOrderId) {
                throw new Error('The order id is invalid')
            }

            const isValidProductId = await findProductByIdService.execute(item.productId);
            if (!isValidProductId) {
                throw new Error('The product id is invalid')
            }

        } catch (error) {
            throw new Error(`[ValidateItemService] - ${error}`)
        }
    }
}

export { ValidateItemService }