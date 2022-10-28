import prismaClient from "../../prisma";
import { FindCategoryByIdService } from "../category/FindCategoryByIdService";
import { ProductModel } from "./interfaces/ProductModel";
import { ValidateProductService } from "./ValidateProductService";


class FindProductByIdService {
    async execute(productId: string): Promise<ProductModel> {

        const categoryService = new FindCategoryByIdService();

        try {
           if(!productId){
               throw new Error('[FindProductByIdService] - product id was not informed');
           }

            const producCreated = await prismaClient.product.findFirst({
                where: {
                    id: productId,
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
                category: categoryData,
            };

        } catch (error) {
            throw new Error(error);
        }
    }
}

export { FindProductByIdService }