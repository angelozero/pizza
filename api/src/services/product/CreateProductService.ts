import prismaClient from "../../prisma";
import { FindCategoryByIdService } from "../category/FindCategoryByIdService";
import { ProductModel } from "./interfaces/ProductModel";
import { ValidateProductService } from "./ValidateProductService";


class CreateProductService {
    async execute(product: ProductModel): Promise<ProductModel> {

        const validateProductService = new ValidateProductService();
        const categoryService = new FindCategoryByIdService();

        try {
            await validateProductService.execute(product);

            const producCreated = await prismaClient.product.create({
                data: {
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    banner: product.banner,
                    category_id: product.categoryId,
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    banner: true,
                    category_id: true,
                }
            })

            const categoryData = await categoryService.execute(producCreated.category_id);

            return {
                id: producCreated.id,
                name: producCreated.name,
                price: producCreated.price,
                description: producCreated.description,
                banner: producCreated.banner,
                categoryId: categoryData.id,
            };

        } catch (error) {
            throw new Error(`[CreateProductService] - ${error.message}`)
        }
    }
}

export { CreateProductService }