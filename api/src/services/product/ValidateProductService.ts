import { ProductModel } from "./interfaces/ProductModel";

class ValidateProductService {
    async execute(product: ProductModel) {

        if (!product) {
            throw new Error('[ValidateProductService] - product was not informed')
        }

        if (!product.name) {
            throw new Error('[ValidateProductService] - product name was not informed')
        }

        if (!product.price) {
            throw new Error('[ValidateProductService] - product price was not informed')
        }

        if(!product.banner){
            throw new Error('[ValidateProductService] - product banner was not informed')
        }
        
        if (!product.categoryId) {
            throw new Error('[ValidateProductService] - product category id was not informed')
        }
    }
}

export { ValidateProductService }