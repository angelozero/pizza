import { ItemOrderModel } from "./interfaces/ItemOrderModel"
import { OrderModel } from "./interfaces/OrderModel"

class ValidateItemOrderService {
    async execute(item: ItemOrderModel) {
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
    }
}

export { ValidateItemOrderService }