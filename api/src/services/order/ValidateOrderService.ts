import { OrderModel } from "./interfaces/OrderModel"

class ValidateOrderService {
    async execute(order: OrderModel) {
        if (!order) {
            throw new Error('Order was not informed')
        }
        if (!order.table) {
            throw new Error('Order table was not informed')
        }
        
    }
}

export { ValidateOrderService }